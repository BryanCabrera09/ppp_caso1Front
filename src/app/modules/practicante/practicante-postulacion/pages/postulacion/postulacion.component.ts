import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styleUrls: ['./postulacion.component.css']
})
export class PostulacionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  navegar() {
    this.router.navigate(['practicante/postulacion/seleccion-empresa'])
  }
}
