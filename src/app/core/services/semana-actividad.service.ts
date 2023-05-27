import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SemanaActividad } from '../models/semana-actividad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SemanaActividadService {
  private searchUrl = `${baserUrl}/semanaActividad`;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  create(semana: SemanaActividad): Observable<SemanaActividad> {
    return this.http.post<SemanaActividad>(this.searchUrl + '/crear', semana, { headers: this.httpHeaders })
  }
  obtenerSemana(): Observable<SemanaActividad[]> {
    return this.http.get<SemanaActividad[]>(`${this.searchUrl}/listar`)
  }

}
