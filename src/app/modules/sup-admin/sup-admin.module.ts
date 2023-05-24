import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupAdminRoutingModule } from './sup-admin-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';


@NgModule({
  declarations: [
    WelcomeAdminComponent
  ],
  imports: [
    CommonModule,
    SupAdminRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class SupAdminModule { }
