import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { RegisterTutorRoutingModule } from './register-tutor-routing.module';
import { RegTutorComponent } from './pages/reg-tutor/reg-tutor.component';

//PrimeNg Imports
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToastrModule } from 'ngx-toastr';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    RegTutorComponent
  ],
  imports: [
    CommonModule,
    RegisterTutorRoutingModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTabsModule,
    KeyFilterModule,
    ToastrModule.forRoot(),
    PasswordModule,
    InputMaskModule,
    ToggleButtonModule,
    DividerModule,
    FileUploadModule,
    DropdownModule,
    PanelModule,
    ReactiveFormsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    TableModule,
    DialogModule,
  ]
})
export class RegisterTutorModule { }
