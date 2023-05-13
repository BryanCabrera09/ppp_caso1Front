import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuario';

@Component({
  selector: 'app-practicas',
  templateUrl: './practicas.component.html',
  styleUrls: ['./practicas.component.css']
})
export class PracticasComponent implements OnInit {

  user = new Usuario();

  ngOnInit() {
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails') || "");
    }
  }

  // List of all assigned internships
  

}
