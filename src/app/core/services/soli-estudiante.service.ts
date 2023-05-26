import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SoliEstudiante } from '../models/soli-estudiante';

@Injectable({
  providedIn: 'root'
})
export class SoliEstudianteService {

  private searchUrl = `${baserUrl}/solicitudEstudiante`;
  constructor(private http: HttpClient) { }

  guardarsolicitud(solicitud: SoliEstudiante): Observable<SoliEstudiante> {
    return this.http.post<SoliEstudiante>(`${this.searchUrl}/crear`, solicitud);
  }
}
