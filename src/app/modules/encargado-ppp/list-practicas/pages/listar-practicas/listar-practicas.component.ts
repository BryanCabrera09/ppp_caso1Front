import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Practica } from 'src/app/core/models/practica';
import { PracticasService } from 'src/app/core/services/practicas.service';

@Component({
  selector: 'app-listar-practicas',
  templateUrl: './listar-practicas.component.html',
  styleUrls: ['./listar-practicas.component.css']
})
export class ListarPracticasComponent {

  practicas: Practica[] = [];

  practica = new Practica;

  id: number;
  loading: boolean = true;

  constructor(private practicaService: PracticasService, private router: Router, private activatedRoute: ActivatedRoute) { }

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

                this.practica.id = result.id;
                console.log(this.id);
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

  asignarTutorEspecifico(id: any) {
    this.id = id;
    this.router.navigate(['encargado-practicas/tutoresp/register-tutor/' + this.id]);
  }

  asignarTutorAcademico(id: any) {
    this.id = id;
    this.router.navigate(['encargado-practicas/tutoracad/register-tutor/' + this.id]);
  }
}
