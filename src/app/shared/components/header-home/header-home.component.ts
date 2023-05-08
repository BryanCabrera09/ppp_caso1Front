import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent {

  activeLink = '';

  constructor(private router: Router) { }

  ngOnInit(): void {

    if (this.router.url === '/') {
      this.activeLink = '';
      this.activeLink = 'home';
    } else if (this.router.url === '/login') {
      this.activeLink = '';
      this.activeLink = 'login';
    }
  }

  goToHome(): void {

    this.activeLink = 'home';
    this.router.navigate(['/'])
  }

  goToLogin(): void {

    this.activeLink = 'login';
    this.router.navigate(['/login'])
  }
}