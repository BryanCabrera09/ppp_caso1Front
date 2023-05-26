import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticantePostulacionRoutingModule } from './practicante-postulacion-routing.module';
import { PostulacionComponent } from './pages/postulacion/postulacion.component';
import { SeleccionComponent } from './pages/seleccion/seleccion.component';
import { VistaComponent } from './pages/vista/vista.component';
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



@NgModule({
  declarations: [
    PostulacionComponent,
    SeleccionComponent,
    VistaComponent

  ],
  imports: [
    CommonModule,
    PracticantePostulacionRoutingModule,
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
  ]
})
export class PracticantePostulacionModule { }
