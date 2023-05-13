import { Component, OnInit} from '@angular/core';
import { Carrera } from 'src/app/core/models/carrera';
import { Materia } from 'src/app/core/models/materia';
import { Objetivomateria } from 'src/app/core/models/objetivo-materia';


@Component({
  selector: 'app-reg-objetivos',
  templateUrl: './reg-objetivos.component.html',
  styleUrls: ['./reg-objetivos.component.css'],
})
export class RegObjetivosComponent implements OnInit{
  
  objetivo:Objetivomateria =new Objetivomateria;
  materia:Materia= new Materia;
  carrera:Carrera= new Carrera;

  constructor() {}
  
  ngOnInit() {}
  
  displayStyle = "none";
  displayStyle2 = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  openPopups() {
    this.displayStyle2 = "block";
  }
  closePopups() {
    this.displayStyle2 = "none";
  }
}

