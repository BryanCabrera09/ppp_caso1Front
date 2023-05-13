import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';
import { getCookie } from 'typescript-cookie';
import jwt_decode from 'jwt-decode';


//Google imports
declare var google: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authStatus: string = "";
  model = new Usuario();

  constructor(private loginService: AuthService, private router: Router) {

   }

  ngOnInit(): void {

  }

  validateUser(loginForm: NgForm) {
    this.loginService.validateLoginDetails(this.model).subscribe(
      responseData => {
        const authorizationHeader = responseData.headers.get('Authorization');
        if (authorizationHeader) {
          window.sessionStorage.setItem('Authorization', authorizationHeader);
          const decodedToken: any = jwt_decode(authorizationHeader); // Decode the JWT
          const role = decodedToken.authorities; // Assuming the role is stored in the 'role' field of the JWT payload
          localStorage.setItem("roles", role)
          this.model = <any>responseData.body;
          this.model.authStatus = 'AUTH';
          window.sessionStorage.setItem('userdetails', JSON.stringify(this.model));
          const xsrf = getCookie('XSRF-TOKEN')!;
          window.sessionStorage.setItem('XSRF-TOKEN', xsrf);
          this.router.navigate(['director-carrera']);
        }
      }
    );
  }


}
