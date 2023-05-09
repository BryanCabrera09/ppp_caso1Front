import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import baserUrl from '../helpers/helperUrl';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  private AuthUrl = `${baserUrl}/usuario/`;

  constructor(private http: HttpClient) { }

  signUp(usuario: any) {
    return this.http.post/* <Usuario> */(this.AuthUrl + 'crear', usuario);
  }
}
