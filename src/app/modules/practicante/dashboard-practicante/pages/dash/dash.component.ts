import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  navegar() {
    this.router.navigate(['practicante/postulacion/seleccion-empresa'])
  }
}
