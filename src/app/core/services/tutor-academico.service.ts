import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';
import { TutorAcademico } from '../models/tutor-academico';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorAcademicoService {

  private searchUrl = `${baserUrl}/tutorInstituto`;

  constructor(private http: HttpClient) { }

  searchTutor(id: number) {
    return this.http.get(`${this.searchUrl}/buscar/${id}`);
  }
  ListarTutor(): Observable<TutorAcademico[]> {
    return this.http.get<TutorAcademico[]>(`${this.searchUrl}/listar`);
  }

}
