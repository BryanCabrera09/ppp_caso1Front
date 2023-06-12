import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent {

  activeLink = '';

  constructor(private router: Router, private readonly keycloak: KeycloakService) { }

  ngOnInit(): void {

    if (this.router.url === '/') {
      this.activeLink = '';
      this.activeLink = 'home';
    } else if (this.router.url === '/login') {
      this.activeLink = '';
      this.activeLink = 'login';
    } else if (this.router.url === '/mision-vision-principios') {
      this.activeLink = '';
      this.activeLink = 'info';
    } else if (this.router.url === '/ultimas') {
      this.activeLink = '';
      this.activeLink = 'convocatorias';
    }
  }

  goToHome(): void {

    this.activeLink = 'home';
    this.router.navigate(['/'])
  }

  goToInfo(): void {

    this.activeLink = 'info';
    this.router.navigate(['/mision-vision-principios'])
  }

  goToLogin(): void {

    this.activeLink = 'login';
    this.router.navigate(['/login'])
  }

  public login() {
    this.keycloak.login();
  }

  goToConvocatoria(): void {

    this.activeLink = 'convocatorias';
    this.router.navigate(['/ultimas'])
  }
}
