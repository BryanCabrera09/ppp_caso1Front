import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocenteFenix } from '../models/docente-fenix';

@Injectable({
  providedIn: 'root'
})
export class UsersfenixService {

  private searchUrl = `${baserUrl}/usuariofenix`;

  constructor(private http: HttpClient) { }

  searchStudent(cedula: string) {
    return this.http.get(`${this.searchUrl}/buscaralumnocedula/${cedula}`);
  }

  listDocente(): Observable<DocenteFenix[]> {
    return this.http.get<DocenteFenix[]>(`${this.searchUrl}/listardocentes`);
  }

  searchDocenteByCedula(cedula: string) {
    return this.http.get(`${this.searchUrl}/buscarusuario/${cedula}`);
  }

}
