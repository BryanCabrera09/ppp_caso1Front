import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../models/actividad';
import baserUrl from '../helpers/helperUrl';


@Injectable({
  providedIn: 'root'
})
export class ActividadpService {

  private baseURL = `${baserUrl}/actividad`;

  constructor(private httpClient: HttpClient) { }

  obtenerActividad(): Observable<Actividad[]> {
    return this.httpClient.get<Actividad[]>(`${this.baseURL}/listar`);
  }

  obtenerActividadid(id: number): Observable<Actividad[]> {
    const url = `${this.baseURL}/listarxSolicitudEmpresa2?id=${id}`;
    return this.httpClient.get<Actividad[]>(url);
  }

  actividadBySolicitud(id: number): Observable<Actividad[]> {
    return this.httpClient.get<Actividad[]>(`${this.baseURL}/buscar/${id}`);
  }

}
