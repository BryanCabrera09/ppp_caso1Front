import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';
import { getCookie } from 'typescript-cookie';
import jwt_decode from 'jwt-decode';

import { catchError, throwError } from 'rxjs';

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

  loginUser(loginForm: NgForm) {
    this.loginService.validateLoginDetails(this.usuario).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.toastr.error('Credenciales incorrectas', 'Error de autenticación');
        }
        return throwError(error);
      })
    ).subscribe(
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

          if (sessionStorage.getItem('userdetails')) {
            this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
            const role = localStorage.getItem('roles');
            switch (role) {
              case 'ROLE_DIREC':
                this.router.navigate(['/director-carrera']);
                console.log('Selected fruit is apple.');
                break;
              case 'ROLE_RESPP':
                this.router.navigate(['/encargado-practicas']);
                console.log('Selected fruit is banana.');
                break;
              case 'ROLE_ESTUD':
                this.router.navigate(['/practicante']);
                console.log('Selected fruit is orange.');
                break;
              case 'ROLE_GEREN':
                this.router.navigate(['/responsable-empresa']);
                console.log('Selected fruit is orange.');
                break;
              case 'ROLE_TISTA':
                this.router.navigate(['/tutor-academico']);
                console.log('Selected fruit is orange.');
                break;
              case 'ROLE_TEMP':
                this.router.navigate(['/tutor-especifico']);
                console.log('Selected fruit is orange.');
                break;
              default:
                this.router.navigate(['../login']);
                console.log('Selected fruit is unknown.');
                break;
            }
            console.log(role);
          }
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

  createAccout() {
    this.router.navigate(['/register']);
  }

}
