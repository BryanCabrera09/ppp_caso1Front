import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WelcomeHomeComponent } from './welcome-home/welcome-home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';


@NgModule({
  declarations: [
    WelcomeHomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    SharedModule,
    OverlayModule,
    CdkMenuModule,
  ],
  exports:[
    WelcomeHomeComponent,
  ]
})
export class HomeModule { }
