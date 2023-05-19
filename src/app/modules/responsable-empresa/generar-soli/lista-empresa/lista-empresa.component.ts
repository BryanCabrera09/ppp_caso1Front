import { Component, OnInit } from '@angular/core';
import { Convenio } from 'src/app/core/models/convenio';
import { Empresa } from 'src/app/core/models/empresa';
import { ConvenioService } from 'src/app/core/services/convenio.service';
import { RegEmpresaServiceService } from 'src/app/core/services/reg-empresa-service.service';

@Component({
  selector: 'app-lista-empresa',
  templateUrl: './lista-empresa.component.html',
  styleUrls: ['./lista-empresa.component.css']
})
export class ListaEmpresaComponent implements OnInit {

  Empresas: Empresa[]= [];
  Convenios : Convenio[]= [];
  
  constructor(private Convenoservice:ConvenioService){}
  
  ngOnInit(): void {
    this.Convenoservice.listarcon().subscribe(
      convenio => this.Convenios = convenio,
    );

  }

  traerid(id:any){
    const idemp = id 
    localStorage.setItem('IdCon', JSON.stringify(idemp))
  }



}
