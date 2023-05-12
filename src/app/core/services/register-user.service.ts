import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from '../helpers/helperUrl';
import { UserFenix } from '../models/user-fenix';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  private AuthUrl = `${baserUrl}/usuario/`;

  constructor(private http: HttpClient) { }

  registerStudent(student: UserFenix) {
    return this.http.post(this.AuthUrl + 'register', student);
  }

  /* signUp(usuario: Usuario) {
    return this.http.post(this.AuthUrl + 'usuario/crear', usuario);
  } */
}
