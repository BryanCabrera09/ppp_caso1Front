import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener, Input } from '@angular/core';
import { navbarData } from './nav-data';
import { INavbarData, fadeInOut } from './helper';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/usuario';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' })
          ])
        )
      ])
    ])
  ]
})

export class SidebarComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;

  rolUsuario: string;

  user = new Usuario();

  estaLogueado?: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    if (sessionStorage.getItem('userdetails')) {
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
      const role = localStorage.getItem('roles');
      if (role == 'ROLE_ESTUD') {
        //this.rolUsuario = 'Practicante';
        this.rolUsuario = 'Responsable Practicas';
        this.estaLogueado = true;
      }
      console.log(role);
    }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
}
