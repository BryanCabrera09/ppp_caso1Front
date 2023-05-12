import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/core/models/empresa';
import { RegEmpresaServiceService } from '../../reg-empresa-service.service';
@Component({
  selector: 'app-reg-empresa',
  templateUrl: './reg-empresa.component.html',
  styleUrls: ['./reg-empresa.component.css']
})
export class RegEmpresaComponent implements OnInit{

  

  Empresas: Empresa[]= [];

  constructor(private EmpresaService: RegEmpresaServiceService){}

  ngOnInit(): void {
    this.EmpresaService.obtenerempresas().subscribe(
      empresa => this.Empresas = empresa
    );

  }

  traerid(id:any){
    const idemp = id 
    localStorage.setItem('IdEmpresa', JSON.stringify(idemp))
  }

}
