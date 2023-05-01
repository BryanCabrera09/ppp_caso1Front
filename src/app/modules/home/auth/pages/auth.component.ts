import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/shared/services/authentification.service';

//Google imports
declare var google: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, AfterViewInit {

  public myForm!: FormGroup;

  constructor(private router: Router, private builder: FormBuilder, private authService: AuthentificationService) { }

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


  ngOnInit() {

    console.log("se encuentra2");
    console.log(this.router);
    this.myForm = this.createMyForm();
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
      usuario: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  public submitFormulario() {
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    if (!this.authService.ingresarAplicativo(this.myForm.value)) {
      alert("Usuario o contraseña invalido");
    } else {
      this.router.navigateByUrl("/sesion/principal");
    }
  }

  public get f(): any {
    return this.myForm.controls;
  }

  goToLogin(): void {

    this.router.navigate(['/encargado-practicas'])
  }
}
