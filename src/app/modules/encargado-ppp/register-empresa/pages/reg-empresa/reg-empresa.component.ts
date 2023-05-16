import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/core/models/empresa';
import { RegEmpresaServiceService } from '../../../../../core/services/reg-empresa-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reg-empresa',
  templateUrl: './reg-empresa.component.html',
  styleUrls: ['./reg-empresa.component.css']
})
export class RegEmpresaComponent implements OnInit {

  empresas: Empresa[] = [];

  loading: boolean = true;

  constructor(private EmpresaService: RegEmpresaServiceService, private router: Router) { }

  ngOnInit() {
    this.EmpresaService.obtenerempresas().subscribe(
      empresa => {
        this.empresas = empresa
        this.loading = false;
      }
    );
  }

  traerid(id: any) {
    const idemp = id
    localStorage.setItem('IdEmpresa', JSON.stringify(idemp));
    this.router.navigate(['/encargado-practicas/empresa/form']);
  }

  traerempresa(empresa: any) {
    const emp = empresa
    localStorage.setItem('empresa', emp);
    this.router.navigate(['/encargado-practicas/empresa/register-convenio']);
  }

  agregarEmpresa() {
    this.router.navigate(['/encargado-practicas/empresa/form']);
  }

}
