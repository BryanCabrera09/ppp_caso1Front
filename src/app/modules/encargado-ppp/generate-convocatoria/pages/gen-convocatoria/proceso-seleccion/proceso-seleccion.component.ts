import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proceso-seleccion',
  templateUrl: './proceso-seleccion.component.html',
  styleUrls: ['./proceso-seleccion.component.css']
})
export class ProcesoSeleccionComponent implements OnInit{
  displayEU: boolean = false;
  loading: boolean = true;
  
  ngOnInit(): void {
    
  }

  constructor(){}


}
