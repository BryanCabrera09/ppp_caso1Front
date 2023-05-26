import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Convenio } from 'src/app/core/models/convenio';
import { Empresa } from 'src/app/core/models/empresa';
import { ConvenioService } from 'src/app/core/services/convenio.service';

@Component({
  selector: 'app-lista-empresa',
  templateUrl: './lista-empresa.component.html',
  styleUrls: ['./lista-empresa.component.css']
})
export class ListaEmpresaComponent implements OnInit {

  Empresas: Empresa[] = [];
  convenios: Convenio[] = [];

  empresa = new Empresa;

  id: number;
  loading: boolean = true;

  constructor(private convenoService: ConvenioService, private router: Router) { }

  ngOnInit() {
    this.convenoService.listarcon().subscribe(
      data => {
        this.convenios = data;
      }
    );
    this.loading = false;
  }

  traerid(id: any) {
    this.id = id
    this.router.navigate(['responsable-empresa/soli/lista/' + this.id]);
  }
}
