import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/usuario';
import { PracticaService } from 'src/app/core/services/practica.service';

@Component({
  selector: 'app-practicas-tutor',
  templateUrl: './practicas-tutor.component.html',
  styleUrls: ['./practicas-tutor.component.css']
})
export class PracticasTutorComponent {
  
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
