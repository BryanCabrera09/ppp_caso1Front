import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/usuario';
import { PracticaService } from 'src/app/core/services/practica.service';

@Component({
  selector: 'app-plan-visitas',
  templateUrl: './plan-visitas.component.html',
  styleUrls: ['./plan-visitas.component.css']
})
export class PlanVisitasComponent {

  user = new Usuario();
  practicas: any[] = []

  constructor(private practicaService: PracticaService, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || "");
    console.log(this.user)
    this.listPracticas()
  }

  listPracticas() {
    this.practicaService.listarByTistaUsuario(this.user.id).subscribe(
      (response) => {
        this.practicas = response.body;
        console.log("Lista de practicas: " + this.practicas);
      }
    );
  }

}
