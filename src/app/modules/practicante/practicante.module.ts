import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticanteRoutingModule } from './practicante-routing.module';
import { WelcomePracticanteComponent } from './welcome-practicante/welcome-practicante.component';


@NgModule({
  declarations: [
    WelcomePracticanteComponent
  ],
  imports: [
    CommonModule,
    PracticanteRoutingModule
  ]
})
export class PracticanteModule { }
