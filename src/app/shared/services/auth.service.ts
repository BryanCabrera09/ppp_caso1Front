import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuario';
import { environment } from 'src/app/core/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  validateLoginDetails(user: Usuario) {
    window.sessionStorage.setItem("userdetails", JSON.stringify(user));
    return this.http.get(environment.rooturl + "/ingresar", { observe: 'response', withCredentials: true });
  }

}
