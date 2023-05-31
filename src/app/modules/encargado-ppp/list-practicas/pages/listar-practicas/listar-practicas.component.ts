import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Anexos } from 'src/app/core/models/anexos';
import { Practica } from 'src/app/core/models/practica';
import { AnexosService } from 'src/app/core/services/anexos.service';
import { PracticasService } from 'src/app/core/services/practicas.service';

@Component({
  selector: 'app-listar-practicas',
  templateUrl: './listar-practicas.component.html',
  styleUrls: ['./listar-practicas.component.css']
})
export class ListarPracticasComponent implements OnInit {

  practicas: Practica[] = [];

  practica = new Practica;
  anexo = new Anexos;

  id: number;
  loading: boolean = true;
  datosExistentes: boolean;

  constructor(private practicaService: PracticasService, private router: Router, private activatedRoute: ActivatedRoute,
    private anexoService: AnexosService) { }

  ngOnInit() {
    this.cargarPracticas();
  }

  cargarPracticas() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      console.log(id)
      if (id) {
        this.practicaService.searchByConvo(id).subscribe(
          data => {
            this.practicas = data.map(
              result => {
                let practica = new Practica;
                practica.id = result.id;
                practica.inicio = result.inicio;
                practica.fin = result.fin;
                practica.nsemanas = result.nsemanas;
                practica.tutorInstituto = result.tutorInstituto;
                this.practica.id = result.id;
                this.anexoService.listarPorTipo(this.practica.id, 1).subscribe(
                  (data: Anexos) => {
                    this.anexo = data;
                    this.datosExistentes = true;
                    console.log(this.anexo);
                  }
                );
                console.log(this.practica.id);
                return practica;
              }
            );
          }
        );
      }
    }
    );
    this.loading = false;
  }

  descargarPDF(value) {
    this.anexoService.obtenerPDF(value).subscribe(response => {
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
    return 'obligaciones-estudiante.pdf';
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

  asignarTutorEspecifico(id: any) {
    this.id = id;
    this.router.navigate(['encargado-practicas/tutoresp/register-tutor/' + this.id]);
  }

  asignarTutorAcademico(id: any) {
    this.id = id;
    this.router.navigate(['encargado-practicas/tutoracad/register-tutor/' + this.id]);
  }
}
