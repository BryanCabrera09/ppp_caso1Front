import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateConvocatoriaRoutingModule } from './generate-convocatoria-routing.module';
import { GenConvocatoriaComponent } from './pages/gen-convocatoria/gen-convocatoria.component';
import { FormComponent } from './pages/gen-convocatoria/form/form.component';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgProgressModule } from 'ngx-progressbar';


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

import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProcesoSeleccionComponent } from './pages/gen-convocatoria/proceso-seleccion/proceso-seleccion.component';



@NgModule({
  declarations: [
    GenConvocatoriaComponent,
    FormComponent,
    ProcesoSeleccionComponent
  ],
  imports: [
    CommonModule,
    GenerateConvocatoriaRoutingModule,
    PanelModule,
    CalendarModule,
    FormsModule,
    MatTableModule,
    MatTabsModule,
    NgProgressModule,
    ToastrModule,
    ButtonModule,
    CardModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FileUploadModule,
    InputMaskModule,
    InputTextModule,
    KeyFilterModule,
    MenubarModule,
    PasswordModule,
    TableModule,
    ToggleButtonModule,
    InputTextareaModule,
    RadioButtonModule

  ]
})
export class GenerateConvocatoriaModule { }
