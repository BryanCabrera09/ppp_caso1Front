import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { empresa } from '../../../empresa';
import { RegEmpresaServiceService } from '../../../reg-empresa-service.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit{
  ngOnInit(): void {}

 constructor(private EmpresaService: RegEmpresaServiceService){

 }
  
 public Empresa: empresa =  new empresa();

 public crearempresa(reg: NgForm): void{
  console.log("Se ha realizado un click")

  this.Empresa.activo = true;

    this.EmpresaService.create(this.Empresa).subscribe()  
     window.location.reload();

 }
}
