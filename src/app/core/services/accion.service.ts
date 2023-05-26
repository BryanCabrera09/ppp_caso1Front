import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { accion } from '../models/accion';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccionService {
  private baseURL = `${baserUrl}/accion`;

  constructor(private httpClient: HttpClient) { }

  registerActividad(Accion: accion): Observable<accion> {
    return this.httpClient.post<accion>(this.baseURL + '/crear', Accion);
  }

  ObtenerAcciones(): Observable<accion[]>{
    return this.httpClient.get<accion[]>(`${this.baseURL}/listar`);
  }

}
