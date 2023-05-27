import { HttpClient, HttpResponse } from '@angular/common/http';
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

  guardarDocumento(archivo: File, id: number): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    return this.http.post(`${this.searchUrl}/guardarpdf/${id}`, formData);
  }

  guardarPDF(archivo: File, id: number) {
    const formData = new FormData();
    formData.append('archivo', archivo, archivo.name);
    formData.append('id', id.toString());

    return this.http.post(`${this.searchUrl}/guardarpdf`, formData, { responseType: 'text' });
  }

  obtenerPDF(id: number): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.searchUrl}/mostrarpdf/${id}`, {
      responseType: 'blob',
      observe: 'response'
    });
  }
  
  
}
