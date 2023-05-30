import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaSolicitudesRoutingModule } from './lista-solicitudes-routing.module';
import { SolicitudesPostulacionComponent } from './pages/solicitudes-postulacion/solicitudes-postulacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [
    SolicitudesPostulacionComponent
  ],
  imports: [
    CommonModule,
    ListaSolicitudesRoutingModule,
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
    TagModule
  ]
})
export class ListaSolicitudesModule { }
