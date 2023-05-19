import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';
import { TutorEmpresarial } from '../models/tutor-empresarial';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorEmpresarialService {

  private tutorUrl = `${baserUrl}/tutorEmpresa`;

  constructor(private http: HttpClient) { }

  searchTutor(id: number) {
    return this.http.get(`${this.tutorUrl}/buscar/${id}`);
  }

  ListarTutor(): Observable<TutorEmpresarial[]> {
    return this.http.get<TutorEmpresarial[]>(`${this.tutorUrl}/listar`);
  }

  registerTutor(tutor: TutorEmpresarial, rol: string) {
    return this.http.post(this.tutorUrl + '/crear', tutor, { params: { rol } });
  }

  updateTutor(tutor: TutorEmpresarial, url: string, id: number) {
    return this.http.post(`${this.tutorUrl}/editar/${id}`, tutor, { params: { url } });
  }
}
