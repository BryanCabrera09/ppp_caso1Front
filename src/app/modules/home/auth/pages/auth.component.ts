import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';
import { getCookie } from 'typescript-cookie';


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
        window.sessionStorage.setItem("Authorization", responseData.headers.get('Authorization')!);
        this.model = <any> responseData.body;
        this.model.authStatus = 'AUTH';
        window.sessionStorage.setItem("userdetails",JSON.stringify(this.model));
        let xsrf = getCookie('XSRF-TOKEN')!;
        window.sessionStorage.setItem("XSRF-TOKEN",xsrf);
        this.router.navigate(['director-carrera']);
      });

  }


}
