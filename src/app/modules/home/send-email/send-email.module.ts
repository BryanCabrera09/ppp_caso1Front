import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendEmailRoutingModule } from './send-email-routing.module';
import { EmailComponent } from './pages/email/email.component';


@NgModule({
  declarations: [
    EmailComponent
  ],
  imports: [
    CommonModule,
    SendEmailRoutingModule
  ]
})
export class SendEmailModule { }
