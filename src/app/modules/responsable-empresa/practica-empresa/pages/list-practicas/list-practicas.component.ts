import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Practica } from 'src/app/core/models/practica';
import { PracticasService } from 'src/app/core/services/practicas.service';

@Component({
  selector: 'app-list-practicas',
  templateUrl: './list-practicas.component.html',
  styleUrls: ['./list-practicas.component.css']
})
export class ListPracticasComponent implements OnInit {

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
    this.router.navigate(['responsable-empresa/tutoresp/reg-tutor/' + this.id]);
  }
}
