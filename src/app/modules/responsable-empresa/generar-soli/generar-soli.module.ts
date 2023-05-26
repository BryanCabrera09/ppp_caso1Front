import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerarSoliRoutingModule } from './generar-soli-routing.module';
import { SoliEstComponent } from './soli-est/soli-est.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgProgressModule } from 'ngx-progressbar';
import { ListaEmpresaComponent } from './lista-empresa/lista-empresa.component';
import { VerEmpresaComponent } from './ver-empresa/ver-empresa.component';
import { ToastrModule } from 'ngx-toastr';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    SoliEstComponent,
    ListaEmpresaComponent,
    VerEmpresaComponent
  ],
  imports: [
    CommonModule,
    GenerarSoliRoutingModule,
    FormsModule,
    NgProgressModule,
    FormsModule,
    ToastrModule.forRoot(),
    AvatarModule,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    InputMaskModule,
    PanelModule,
    PanelMenuModule,
    RadioButtonModule,
    TableModule,
    ToastModule,
    CardModule,
    KeyFilterModule,
    InputTextModule,
    CalendarModule
  ]
})
export class GenerarSoliModule { }
