import { Component, OnInit } from '@angular/core';
import { accion } from 'src/app/core/models/accion';
import { Actividad } from 'src/app/core/models/actividad';
import { AccionService } from 'src/app/core/services/accion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proceso-seleccion',
  templateUrl: './proceso-seleccion.component.html',
  styleUrls: ['./proceso-seleccion.component.css']
})
export class ProcesoSeleccionComponent implements OnInit{
  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQWXYZ/;:]+$/;

  displayEU: boolean = false;
  loading: boolean = true;
  accions: accion= new accion
  acciones: accion[];
  ngOnInit(): void {
    this.llamaracciones();
    
  }

  constructor(private accionService: AccionService){}

  actividad(){
    this.displayEU = true;
    this.limpiar();
  }

  llamaracciones(){
    this.accionService.ObtenerAcciones().subscribe(
      data=>{
        this.acciones = data;
      }
    )
  }

  guardaract(){
    this.accionService.registerActividad(this.accions).subscribe(
      result=>{
        Swal.fire('Guardado', 'Aprobacion Registrada', 'success');
        
        
      }
    );
    
   

  }

  cancelar() {
    this.limpiar();
  }
  limpiar() {
    this.accions = new accion
  }

}
