import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';
import { getCookie } from 'typescript-cookie';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public formLogin!: FormGroup;

  @ViewChild("email") email!: ElementRef;
  @ViewChild("password") password!: ElementRef;

  authStatus: string;
  usuario = new Usuario();

  constructor(private loginService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void { }

  /* loginUser(loginForm: NgForm) {
    if (this.usuario.correo !== '' || this.usuario.correo !== null && this.usuario.password !== '' || this.usuario.password !== null) {
      this.loginService.validateLoginDetails(this.usuario).subscribe(
        responseData => {
          console.log('llego');
          window.sessionStorage.setItem("Authorization", responseData.headers.get('Authorization')!);
          console.log('llego hasta');
          this.usuario = <any>responseData.body;
          this.usuario.authStatus = 'AUTH';
          console.log('llego hasta ac');
          let xsrf = getCookie('XSRF-TOKEN');
          if (xsrf !== undefined) {
            window.sessionStorage.setItem("XSRF-TOKEN", xsrf);
          }
          console.log(xsrf);
          window.sessionStorage.setItem("userdetails", JSON.stringify(this.usuario));
          this.router.navigate(['director-carrera']);
        }
      );
    }
  } */

  loginUser(loginForm: NgForm) {
    this.loginService.validateLoginDetails(this.usuario).subscribe(
      responseData => {
        const authorizationHeader = responseData.headers.get('Authorization');
        if (authorizationHeader) {
          window.sessionStorage.setItem('Authorization', authorizationHeader);
          const decodedToken: any = jwt_decode(authorizationHeader); // Decode the JWT
          const role = decodedToken.authorities; // Assuming the role is stored in the 'role' field of the JWT payload
          localStorage.setItem("roles", role)
          this.usuario = <any>responseData.body;
          this.usuario.authStatus = 'AUTH';
          window.sessionStorage.setItem('userdetails', JSON.stringify(this.usuario));
          const xsrf = getCookie('XSRF-TOKEN')!;
          if (xsrf !== undefined) {
            window.sessionStorage.setItem("XSRF-TOKEN", xsrf);
          } //Arreglar que cuando ingrese con un segundo intento se cree el xsrf
          console.log(xsrf);
          this.router.navigate(['director-carrera']);
        }
      }
    );
  }

  handleCredentialResponse(response: any) {
    console.log(response);
    console.log(this.router);
    if (response.credential) {
      sessionStorage.setItem("token", response.credential);
      document.location.href = "/encargado-practicas";
    }
  }

  logInGoogle(): void {
    this.loginService.loginGoogle(this.usuario.correo, this.usuario.password).then(res => {
      if (res) {
        console.log(res);
        this.router.navigate(['/encargado-practicas']);
      } else {
        console.log("No se ha podido hacer el log-in correctamente.");
      }
    });
  }

}
