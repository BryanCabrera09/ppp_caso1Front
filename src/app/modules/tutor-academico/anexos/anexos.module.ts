import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnexosRoutingModule } from './anexos-routing.module';
import { AnxochComponent } from './anxoch/anxoch.component';
import { LispractComponent } from './lispract/lispract.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgProgressModule } from 'ngx-progressbar';
import { ToastrModule } from 'ngx-toastr';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
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


@NgModule({
  declarations: [
    AnxochComponent,
    LispractComponent
  ],
  imports: [
    CommonModule,
    AnexosRoutingModule,
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
export class AnexosModule { }
