import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
 public crearempresa(): void{
    this.EmpresaService.create(this.Empresa).subscribe()  

 }
}
