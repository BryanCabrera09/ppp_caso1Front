import { Component, HostListener, Input, OnInit } from '@angular/core';
import { languages, notifications, userItems } from './header-dummy-data';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/app/core/models/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  user = new Usuario();

  isLogged: Boolean = false;

  canShowSearchAsOverlay = false;
  selectedLanguage: any;

  languages = languages;
  notifications = notifications;
  userItems = userItems;

  public objetounico: any = {};

  public logueado: boolean;
  public usuario: any;

  constructor(private router: Router, public authService: AuthService) {
    this.logueado = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {

    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }

    // this.usuarioLogueado();

    // this.checkCanShowSearchAsOverlay(window.innerWidth);

    // this.selectedLanguage = this.languages[0];

    // let token = sessionStorage.getItem("token") as string;
    // this.objetounico = this.decodificarJwt(token);
    // console.log("mi objecto", this.objetounico);
  }

  private decodificarJwt(token: string): any {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  getHeadClass(): string {

    let styleClass = '';

    if (this.collapsed && this.screenWidth > 768) {

      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }

    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {

    if (innerWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }

  usuarioLogueado() {
    // this.authService.getInfoUsuarioLoggeado().subscribe(res => {
    //   if (res != null) {
    //     this.logueado = true;
    //     this.usuario = res;
    //   }
    //   else {
    //     this.logueado = false;
    //   }
    // });
  }

  logOut(): void {
    window.sessionStorage.setItem("userdetails","");
    window.sessionStorage.setItem("XSRF-TOKEN","");
    this.router.navigate(['/login']);
  }

  /* logOut() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  } */
}
