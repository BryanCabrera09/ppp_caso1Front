import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/core/models/empresa';

@Component({
  selector: 'app-lista-empresa',
  templateUrl: './lista-empresa.component.html',
  styleUrls: ['./lista-empresa.component.css']
})
export class ListaEmpresaComponent implements OnInit {
  ngOnInit(): void {
    
  }

  Empresas: Empresa[]= [];
 
  



}
