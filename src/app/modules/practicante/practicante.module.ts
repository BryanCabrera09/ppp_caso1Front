import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticanteRoutingModule } from './practicante-routing.module';
import { WelcomePracticanteComponent } from './welcome-practicante/welcome-practicante.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WelcomePracticanteComponent
  ],
  imports: [
    CommonModule,
    PracticanteRoutingModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    WelcomePracticanteComponent
  ]
})
export class PracticanteModule { }
