import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TutorInstituto } from '../models/tutor-academico';

@Injectable({
  providedIn: 'root'
})
export class TutorAcademicoService {

  private tutorUrl = `${baserUrl}/tutorInstituto`;

  constructor(private http: HttpClient) { }

  searchTutor(id: number) {
    return this.http.get(`${this.tutorUrl}/buscar/${id}`);
  }

  ListarTutor(): Observable<TutorInstituto[]> {
    return this.http.get<TutorInstituto[]>(`${this.tutorUrl}/listar`);
  }

  registerTutor(tutor: TutorInstituto, rol: string) {
    return this.http.post(this.tutorUrl + '/crear', tutor, { params: { rol } });
  }

  updateTutor(tutor: TutorInstituto, url: string, id: number) {
    return this.http.post(`${this.tutorUrl}/editar/${id}`, tutor, { params: { url } });
  }

  guardarPDF(archivo: File, id: number) {
    const formData = new FormData();
    formData.append('archivo', archivo, archivo.name);
    formData.append('id', id.toString());

    return this.http.post(`${this.tutorUrl}/guardarpdf`, formData, { responseType: 'text' });
  }

  buscarxusuario(id:number){
    return this.http.get(`${this.tutorUrl}/buscarxusuario/${id}`);
  }
}
