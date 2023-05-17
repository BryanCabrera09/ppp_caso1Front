import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baserUrl from '../helpers/helperUrl';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})

export class RegisterUserService {

  private AuthUrl = `${baserUrl}/`;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  registerStudent(estudiante: Estudiante) {
    return this.http.post(this.AuthUrl + 'register', estudiante, { headers: this.httpHeaders });
  }
}
