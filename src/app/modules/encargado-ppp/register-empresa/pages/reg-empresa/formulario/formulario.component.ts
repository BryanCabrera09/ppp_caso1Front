import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  currentStep = 0;
  progress = 0;
  
  steps = [
    {
      title: 'Paso 1',
      icon: 'fa fa-user',
      form: new FormGroup({
        ruc: new FormControl('', Validators.required),
        empresa: new FormControl('', Validators.required),
        matriz: new FormControl('', Validators.required),
      }),
    },
    {
      title: 'Paso 2',
      icon: 'fa fa-info',
      form: new FormGroup({
        mision: new FormControl('', Validators.required),
        vision: new FormControl('', Validators.required),
        valores: new FormControl('', Validators.required),
      }),
    },
    {
      title: 'Paso 3',
      icon: 'fa fa-check',
      form: new FormGroup({
        terminos: new FormControl(false, Validators.requiredTrue),
      }),
    },
  ];
  

}
