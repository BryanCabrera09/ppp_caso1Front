import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterEmpresaRoutingModule } from './register-empresa-routing.module';
import { RegEmpresaComponent } from './pages/reg-empresa/reg-empresa.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegEmpresaComponent
  ],
  imports: [
    CommonModule,
    RegisterEmpresaRoutingModule,
    FormsModule
  ]
})
export class RegisterEmpresaModule { }
