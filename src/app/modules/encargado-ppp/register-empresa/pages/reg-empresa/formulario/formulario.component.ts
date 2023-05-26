import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Empresa } from 'src/app/core/models/empresa';

import Swal from 'sweetalert2';
import { RegEmpresaServiceService } from 'src/app/core/services/reg-empresa-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  empresa: Empresa = new Empresa();

  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQWXYZ/;:]+$/;

  estado: string[] = [];

  estadoSelect: string
  isMisionFilled: boolean = false;

  constructor(private EmpresaService: RegEmpresaServiceService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.edit();
  }

  public onMisionChange(value: string): void {
    this.isMisionFilled = value && value.trim().length > 0;
  }

  public crearempresa() {

    this.empresa.activo = true;

    this.EmpresaService.create(this.empresa).subscribe(
      (result: Empresa) => {
        this.router.navigate(['encargado-practicas/tutoresp/register-tutor-emp/' + result.id]);
      }
    )
  }

  boton: boolean = false;
  public edit() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.EmpresaService.buscarporxID1(id).subscribe((data: Empresa) => {
          this.empresa = data
          this.empresa.activo = data.activo
          //validacion de COmbo

          if (this.empresa.activo === true) {
            this.estado = ['Activo', 'Inactivo'];
          } else if (this.empresa.activo === false) {
            this.estado = ['Inactivo', 'Activo'];
          }
        });

        //Validacion de boton
        if (isNaN(id)) {
          this.boton = false
        } else {
          this.boton = true
        }

      }
    });


  }


  public guardarEdit(id: number, empresa: any) {
    if (this.estadoSelect === 'Activo') {
      this.empresa.activo = true;
    } else {
      this.empresa.activo = false;
    }

    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.EmpresaService.actualizar(id, this.empresa).subscribe(
          (data) => {
            console.log(data);
            this.ngOnInit();
            Swal.fire('Empresa Guardada', 'Empresa Guardada con éxito en el sistema', 'success');
            this.router.navigate(['encargado-practicas/empresa/register-empresa']);
          }, (error) => {
            console.log(error);
            Swal.fire('Error', 'Empresa no Guardada', 'error');
          }
        );
      }
    });
  }
}
