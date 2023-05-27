import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Practica } from 'src/app/core/models/practica';
import { Usuario } from 'src/app/core/models/usuario';
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

  idUs: number;

  id: number;
  loading: boolean = true;

  constructor(private practicaService: PracticasService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
        this.practicas = data;
      },
      (error) => {
        console.error(error);
      }
    );
    this.loading = false;
  }

  asignarTutorEspecifico(id: any) {
    this.id = id;
    this.router.navigate(['responsable-empresa/tutoresp/reg-tutor/' + this.id]);
  }
}
