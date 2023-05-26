import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { Observable } from 'rxjs';
import { Calificacion } from '../models/calificacion';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  private searchUrl = `${baserUrl}/calificacion`;

  constructor(private http: HttpClient) { }

  saveGrade(calificacion: Calificacion): Observable<Calificacion[]> {
    return this.http.post<Calificacion[]>(`${this.searchUrl}/crear`, calificacion);
  }

  buscarxPractica(id: number)/* : Observable<Calificacion[]>  */{
    return this.http.get/* <Calificacion[]> */(`${this.searchUrl}/listar/practica/${id}`);
  }
}
