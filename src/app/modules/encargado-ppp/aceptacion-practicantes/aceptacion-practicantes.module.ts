import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AceptacionPracticantesRoutingModule } from './aceptacion-practicantes-routing.module';
import { AceptacionSolicitudesComponent } from './pages/aceptacion-solicitudes/aceptacion-solicitudes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// Import PrimeNG modules
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AceptacionSolicitudesComponent
  ],
  imports: [
    CommonModule,
    AceptacionPracticantesRoutingModule,
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
    InputTextModule
  ],
  bootstrap: [AceptacionSolicitudesComponent],
})
export class AceptacionPracticantesModule { }
