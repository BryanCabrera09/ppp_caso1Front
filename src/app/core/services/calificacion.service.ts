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

  saveGrade(calificacion: Calificacion): Observable<Calificacion> {
    return this.http.post<Calificacion>(`${this.searchUrl}/crear`, calificacion);
  }
  
  listbyPractica(id: number): Observable<Calificacion[]> {
    const url = `${this.searchUrl}/listar/practica/${id}`;
    return this.http.get<Calificacion[]>(url);
  }

  buscarxPractica(id: number)/* : Observable<Calificacion[]>  */{
    return this.http.get/* <Calificacion[]> */(`${this.searchUrl}/listar/practica/${id}`);
  }

  guardarDocumento(archivo: FormData, id: number) {
    formData.append('archivo', archivo);
    formData.append('id', id.toString());
    return this.http.post(`${this.searchUrl}/guardarpdf`, formData);
  }

  guardarDocumento(formData: FormData, id: number) {
    return this.http.post(this.searchUrl, formData);
  }
  
}
