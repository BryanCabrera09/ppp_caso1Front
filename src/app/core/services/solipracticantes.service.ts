import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Practicante } from '../models/practicante';
import baserUrl from '../helpers/helperUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolipracticantesService {

  private convocatoriaUrl = `${baserUrl}/solicitudEstudiante`;

  constructor(private http: HttpClient) { }

  create(practicante: Practicante) {
    return this.http.post(this.convocatoriaUrl + '/crear', practicante);
  }

  getPostulantes(id: number): Observable<Practicante[]> {
    return this.http.get<Practicante[]>(`${this.convocatoriaUrl}/listarxconvocatoria2`, { params: { id } });
  }

  getPostulantesByEstadoPend(id: number): Observable<Practicante[]> {
    return this.http.get<Practicante[]>(`${this.convocatoriaUrl}/listarpendientesxconvocatoria`, { params: { id } });
  }

  getPostulantesByEstadoAprob(id: number): Observable<Practicante[]> {
    return this.http.get<Practicante[]>(`${this.convocatoriaUrl}/listaraprobadasxconvocatoria`, { params: { id } });
  }

  updatePostulacion(practicante: Practicante, id: number): Observable<any> {
    return this.http.post(`${this.convocatoriaUrl}/editar/${id}`, practicante);
  }

  listPracticante(): Observable<Practicante[]> {
    return this.http.get<Practicante[]>(`${this.convocatoriaUrl}/listar`);
  }

  searchPracticanteById(id: number) {
    return this.http.get(`${this.convocatoriaUrl}/buscar/${id}`);
  }

  practicanteByConvoId(id: number): Observable<Practicante[]> {
    return this.http.get<Practicante[]>(`${this.convocatoriaUrl}/listaraprobadasxconvocatoria`, { params: { id } });
  }

  guardarPDF(archivo: File, id: number) {
    const formData = new FormData();
    formData.append('archivo', archivo, archivo.name);
    formData.append('id', id.toString());

    return this.http.post(`${this.convocatoriaUrl}/guardarpdf`, formData, { responseType: 'text' });
  }
}
