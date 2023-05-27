import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Calificacion } from 'src/app/core/models/calificacion';
import { Usuario } from 'src/app/core/models/usuario';
import { CalificacionService } from 'src/app/core/services/calificacion.service';
import { PracticaService } from 'src/app/core/services/practica.service';

@Component({
  selector: 'app-practicas-tutor',
  templateUrl: './practicas-tutor.component.html',
  styleUrls: ['./practicas-tutor.component.css']
})
export class PracticasTutorComponent {

  mostrarDialogo: boolean;

  user = new Usuario();
  practicas: any[] = [];
  calificaciones: Calificacion[] = [];
  calificacion: Calificacion;

  constructor(private practicaService: PracticaService, private router: Router, 
    private calfService: CalificacionService) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || "");
    this.listPracticas();
  }

  listPracticas() {
    this.practicaService.listarByTempUsuario(this.user.id).subscribe(
      (response) => {
        this.practicas = response.body;
        for(let p of this.practicas) {
          this.listarCalificaciones(p.id);
        }
      }
    );
  }

  listarCalificaciones(id: number) {
    this.calfService.listbyPractica(id).subscribe(
      (data) => {
        this.calificaciones = data;
        this.comparar(this.practicas, this.calificaciones)
      }
    )
  }

  comparar(practicas: any[], calificaciones: Calificacion[]) {
    for (let calificacion of calificaciones) {
      const practicaId = calificacion.practica.id
      
      // Buscar la práctica correspondiente utilizando el practicaId
      const practica = practicas.find(p => p.id === practicaId);

      if (practica && calificacion.tutor == 2) {
        // Se encontró una práctica correspondiente
        // Puedes realizar la comparación y operaciones necesarias aquí
        practica.calificacion = calificacion;
      }
    }
  }

  selectedFile: File | undefined;
  selectedFileName: string;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile ? this.selectedFile.name : '';
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
    this.calfService.guardarPDF(this.selectedFile, this.calificacion.id).subscribe(
      (res) => {
        this.reloadPage();
      }
    )
  }

  descargarPDF(value) {
    this.calfService.obtenerPDF(value).subscribe(response => {
      const filename = this.getFilenameFromResponse(response);
      this.downloadFile(response.body, filename);
    });
  }

  private getFilenameFromResponse(response: HttpResponse<Blob>): string {
    const contentDispositionHeader = response.headers.get('Content-Disposition');
    const matches = /filename[^;=\n]=((['"]).?\2|[^;\n]*)/.exec(contentDispositionHeader);
    if (matches != null && matches[1]) {
      return matches[1].replace(/['"]/g, '');
    }
    return 'documento.pdf';
  }

  private downloadFile(data: Blob, filename: string) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  reloadPage() {
    window.location.reload();
  }

}