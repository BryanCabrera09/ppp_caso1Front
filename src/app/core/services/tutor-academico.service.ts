import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TutorAcademico } from '../models/tutor-academico';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorAcademicoService {

  private tutorUrl = `${baserUrl}/tutorInstituto`;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  searchTutor(id: number) {
    return this.http.get(`${this.tutorUrl}/buscar/${id}`);
  }

  ListarTutor(): Observable<TutorAcademico[]> {
    return this.http.get<TutorAcademico[]>(`${this.tutorUrl}/listar`);
  }

  registerTutor(tutor: TutorAcademico) {
    return this.http.post(this.tutorUrl + '/crear', tutor, { headers: this.httpHeaders });
  }

}
