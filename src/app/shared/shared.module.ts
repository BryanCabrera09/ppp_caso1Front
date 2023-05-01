import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { SublevelMenuComponent } from './components/sidebar/sublevel-menu.component';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        SidebarComponent,
        SublevelMenuComponent,
        HeaderHomeComponent,
        FooterComponent,
        HeaderComponent,
        BodyComponent, 
        HeaderHomeComponent
    ],
    imports: [
        RouterModule,
        OverlayModule,
        CdkMenuModule,
        CommonModule
    ],
    exports: [
        SidebarComponent,
        SublevelMenuComponent,
        FooterComponent,
        HeaderComponent,
        BodyComponent,
        HeaderHomeComponent
    ]
})
export class SharedModule { }
