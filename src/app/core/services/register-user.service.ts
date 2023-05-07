import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import baserUrl from '../helpers/helperUrl';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private http: HttpClient) { }

  signUp(usuario: Usuario) {
    return this.http.post(`${baserUrl}/usuario/`, usuario);
  }
}
