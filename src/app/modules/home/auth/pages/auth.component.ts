import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

//Google imports
declare var google: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, AfterViewInit {

  public formLogin!: FormGroup;

  @ViewChild("email") email!: ElementRef;
  @ViewChild("password") password!: ElementRef;

  constructor(private router: Router, private builder: FormBuilder, private authService: AuthService) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: "611447714728-bv75hffa9b3m0sqdls40fl9qpbc6nenc.apps.googleusercontent.com",
      callback: this.handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }


  ngOnInit(): void {
  }

  handleCredentialResponse(response: any) {
    console.log(response);
    console.log(this.router);
    if (response.credential) {
      sessionStorage.setItem("token", response.credential);
      document.location.href = "/encargado-practicas";
    }
  }

  private createMyForm(): FormGroup {
    return this.builder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  /*  onSubmit() {
     this.userService.login(this.formLogin.value)
       .then(response => {
         console.log(response);
       })
       .catch(error => console.log(error));
   }
 
   onClick() {
     this.userService.loginWithGoogle()
       .then(response => {
         console.log(response);
         this.router.navigate(['/encargado-practicas']);
       })
       .catch(error => console.log(error))
   } */

  logIn(): void {
    var mail = this.email.nativeElement.value;
    var contra = this.password.nativeElement.value;
    this.authService.login(mail, contra).then(res => {
      if (res) {
        console.log(res);
        this.router.navigate(['/encargado-practicas']);
      } else {
        console.log("No se ha podido hacer el log-in correctamente.");
      }
    });
  }

  logInGoogle(): void {
    var mail = this.email.nativeElement.value;
    var password = this.password.nativeElement.value;
    this.authService.loginGoogle(mail, password).then(res => {
      if (res) {
        console.log(res);
        this.router.navigate(['/encargado-practicas']);
      } else {
        console.log("No se ha podido hacer el log-in correctamente.");
      }
    });
  }

  public get f(): any {
    return this.formLogin.controls;
  }

  goToLogin(): void {

    this.router.navigate(['/encargado-practicas'])
  }
}
