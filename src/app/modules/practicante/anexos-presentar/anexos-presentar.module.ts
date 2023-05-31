import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnexosPresentarRoutingModule } from './anexos-presentar-routing.module';
import { PresentarComponent } from './pages/presentar/presentar.component';


@NgModule({
  declarations: [
    PresentarComponent
  ],
  imports: [
    CommonModule,
    AnexosPresentarRoutingModule
  ]
})
export class AnexosPresentarModule { }
