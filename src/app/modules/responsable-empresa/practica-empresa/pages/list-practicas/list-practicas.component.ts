import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Anexos } from 'src/app/core/models/anexos';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Practica } from 'src/app/core/models/practica';
import { Usuario } from 'src/app/core/models/usuario';
import { AnexosService } from 'src/app/core/services/anexos.service';
import { PracticasService } from 'src/app/core/services/practicas.service';

@Component({
  selector: 'app-list-practicas',
  templateUrl: './list-practicas.component.html',
  styleUrls: ['./list-practicas.component.css']
})
export class ListPracticasComponent implements OnInit {

  practicas: Practica[] = [];

  practica = new Practica;
  usuario = new Usuario;
  anexo = new Anexos;
  estudiante = new Estudiante;

  idUs: number;

  id: number;
  loading: boolean = true;
  datosExistentes: boolean;

  constructor(private practicaService: PracticasService, private router: Router, private activatedRoute: ActivatedRoute,
    private anexoService: AnexosService) { }

  ngOnInit() {
    this.cargarPracticas();
  }

  cargarPracticas() {
    this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
    this.idUs = this.usuario.id;
    console.log(this.idUs)

    // Reemplazar con el ID de usuario correspondiente
    this.practicaService.buscarxTutorEmp(this.idUs).subscribe(
      data => {
        this.practicas = data.map(
          result => {
            let practica = new Practica;
            practica.id = result.id;
            practica.inicio = result.inicio;
            practica.fin = result.fin;
            practica.nsemanas = result.nsemanas;
            practica.departamento = result.departamento;
            practica.periodo = result.periodo;
            practica.tutorEmpresarial = result.tutorEmpresarial;
            practica.estudiante = result.estudiante;
            practica.estudiante.usuario = result.estudiante.usuario;
            this.estudiante = result.estudiante;
            this.usuario = result.estudiante.usuario;
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
        );;
      },
      (error) => {
        console.error(error);
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
    this.router.navigate(['responsable-empresa/tutoresp/reg-tutor/' + this.id]);
  }
}
