import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicacionNotasRoutingModule } from './publicacion-notas-routing.module';
import { NotasComponent } from './pages/notas/notas.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgProgressModule } from 'ngx-progressbar';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';


@NgModule({
  declarations: [
    NotasComponent
  ],
  imports: [
    CommonModule,
    PublicacionNotasRoutingModule,
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
    InputTextareaModule
  ]
})
export class PublicacionNotasModule { }
