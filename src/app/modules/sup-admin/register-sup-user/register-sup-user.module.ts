import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterSupUserRoutingModule } from './register-sup-user-routing.module';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    RegisterSupUserRoutingModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastrModule.forRoot(),
    KeyFilterModule,
    DropdownModule
  ]
})
export class RegisterSupUserModule { }
