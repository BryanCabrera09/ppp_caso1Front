import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WelcomeHomeComponent } from './welcome-home/welcome-home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    WelcomeHomeComponent,
   /*  HomePageComponent */
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule
  ]
})
export class HomeModule { }
