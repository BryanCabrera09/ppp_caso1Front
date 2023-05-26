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
  id: number;

  constructor(private EmpresaService: RegEmpresaServiceService, private router: Router) { }

  ngOnInit() {
    this.EmpresaService.obtenerempresas().subscribe(
      empresa => {
        this.empresas = empresa.map(
          result => {
            let empresa = new Empresa;
            empresa.id = result.id;
            empresa.activo = result.activo;
            empresa.matriz = result.matriz;
            empresa.mision = result.mision;
            empresa.nombre = result.nombre;
            empresa.objetivo = result.objetivo;
            empresa.ruc = result.ruc;
            empresa.vision = result.vision;
            this.id = result.id;
            return empresa;
          }
        )
        this.loading = false;
      }
    );
  }

  traerid(id: any) {
    this.id = id;
    //localStorage.setItem('IdEmpresa', JSON.stringify(idemp));
    this.router.navigate(['/encargado-practicas/empresa/form/' + this.id]);
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
