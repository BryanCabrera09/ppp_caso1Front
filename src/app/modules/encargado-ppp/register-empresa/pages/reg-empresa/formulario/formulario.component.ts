import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Empresa } from 'src/app/core/models/empresa';

import Swal from 'sweetalert2';
import { RegEmpresaServiceService } from 'src/app/core/services/reg-empresa-service.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  Empresa: Empresa = new Empresa();

  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQWXYZ/;:]+$/;

  estado: string[] = [
    'Activo', 'Inactivo'
  ];
  isMisionFilled: boolean = false;

  constructor(private EmpresaService: RegEmpresaServiceService) { }

  ngOnInit() {

    this.edit();

    window.addEventListener('beforeunload', (event) => {
      localStorage.removeItem('IdEmpresa');
    });
  }

  public onMisionChange(value: string): void {
    this.isMisionFilled = value && value.trim().length > 0;
  }

  public crearempresa() {
    console.log("Se ha realizado un click")

    this.Empresa.activo = true;

    this.EmpresaService.create(this.Empresa).subscribe()
    window.location.reload();
  }

  boton: boolean = false
  id: number = 0
  public edit() {
    const traerid = JSON.parse(localStorage.getItem('IdEmpresa') + '')
    console.log(traerid)

    this.id = parseInt(traerid);
    this.EmpresaService.buscarporxID(this.id).subscribe((data: any) => {
      this.Empresa = data
    });

    if (isNaN(this.id)) {
      this.boton = false
    } else {
      this.boton = true
    }
  }


  public guardarEdit(id: number, empresa: any) {

    this.EmpresaService.actualizar(this.id, this.Empresa).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
        Swal.fire('Libro actualizado', 'Libro actualizado con éxito en el sistema', 'success');
        window.location.reload();
      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Libro no actualizado', 'error');
      }
    );

    localStorage.removeItem('IdEmpresa')
  }

}
