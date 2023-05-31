import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { VisitaActividad } from '../models/visita-actividad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitaActividadService {
  private searchUrl = `${baserUrl}/visitaActividad`;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  createVisitaA(visitaactividad: VisitaActividad): Observable<VisitaActividad> {
    return this.http.post<VisitaActividad>(this.searchUrl + '/crear', visitaactividad, { headers: this.httpHeaders })
  }
}
