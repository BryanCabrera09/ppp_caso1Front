import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private ingresar: boolean = false;

  constructor() { }


  public ingresarAplicativo(obj: any): boolean {
    this.ingresar = obj.email == 'bryan.cabrera.est@tecazuay.edu.ec' && obj.password == '0150269900sebas';
    return this.ingresar;
  }

  public habilitarlogeo() {
    return this.ingresar;
  }


  public getAutenticationByToken() {
    return sessionStorage.getItem("token");
  }

  public limpiarToken() {
    return sessionStorage.setItem("token", '');
  }
}
