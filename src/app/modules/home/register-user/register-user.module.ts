import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUserRoutingModule } from './register-user-routing.module';
import { RegUserComponent } from './pages/reg-user/reg-user.component';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    RegUserComponent
  ],
  imports: [
    CommonModule,
    RegisterUserRoutingModule,
    FormsModule,
    InputTextModule,
    PasswordModule
  ]
})
export class RegisterUserModule { }
