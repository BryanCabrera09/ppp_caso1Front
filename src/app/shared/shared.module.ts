import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
       /*  SidebarComponent, */
        /* SublevelMenuComponent */
    ],
    imports: [
        RouterModule,
        BrowserAnimationsModule,
        OverlayModule,
        CdkMenuModule,
        BrowserModule
    ],
    exports: [
        /* SidebarComponent,
        SublevelMenuComponent, */
    ]
})
export class SharedModule { }
