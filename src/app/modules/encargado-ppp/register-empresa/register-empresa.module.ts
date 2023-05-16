import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterEmpresaRoutingModule } from './register-empresa-routing.module';
import { RegEmpresaComponent } from './pages/reg-empresa/reg-empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioComponent } from './pages/reg-empresa/formulario/formulario.component';
import { NgProgressModule } from 'ngx-progressbar';
import { FormularionRegConvenioComponent } from './pages/reg-empresa/formularion-reg-convenio/formularion-reg-convenio.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [
    RegEmpresaComponent,
    FormularioComponent,
    FormularionRegConvenioComponent,
  ],
  imports: [
    CommonModule,
    RegisterEmpresaRoutingModule,
    FormsModule,
    NgProgressModule,
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
    InputTextareaModule,
    CalendarModule
  ]
})
export class RegisterEmpresaModule { }
