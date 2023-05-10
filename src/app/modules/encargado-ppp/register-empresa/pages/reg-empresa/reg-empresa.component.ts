import { Component, OnInit } from '@angular/core';
import { empresa } from '../../empresa';
import { RegEmpresaServiceService } from '../../reg-empresa-service.service';
@Component({
  selector: 'app-reg-empresa',
  templateUrl: './reg-empresa.component.html',
  styleUrls: ['./reg-empresa.component.css']
})
export class RegEmpresaComponent implements OnInit{

  

  Empresas: empresa[]= [];

  constructor(private EmpresaService: RegEmpresaServiceService){}

  ngOnInit(): void {
    this.EmpresaService.obtenerempresas().subscribe(
      empresa => this.Empresas = empresa
    );

  }

}
