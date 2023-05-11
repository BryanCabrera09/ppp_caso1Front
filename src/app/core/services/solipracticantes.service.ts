import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Practicante } from '../models/practicante';
import baserUrl from '../helpers/helperUrl';
import { Observable } from 'rxjs';
import { Convocatoria } from '../models/convocatoria';

@Injectable({
  providedIn: 'root'
})
export class SolipracticantesService {

  private convocatoriaUrl = `${baserUrl}/solicitudEstudiante`;

  constructor(private http: HttpClient) { }

  create(practicante: Practicante) {
    return this.http.post(this.convocatoriaUrl + '/crear', practicante);
  }

  getPostulantes(convocatoria?: Convocatoria): Observable<Practicante[]> {
    return this.http.get<Practicante[]>(`${this.convocatoriaUrl}/listarxconvocatoria`, { params: { id: convocatoria.id } });
  }

  updatePostulacion(practicante: Practicante, id: number): Observable<any> {
    return this.http.post(`${this.convocatoriaUrl}/editar/${id}`, practicante);
  }

}
