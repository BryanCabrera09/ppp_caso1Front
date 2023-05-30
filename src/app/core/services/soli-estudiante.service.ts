import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

  guardarPDF(archivo: File, id: number) {
    const formData = new FormData();
    formData.append('archivo', archivo, archivo.name);
    formData.append('id', id.toString());

    return this.http.post(`${this.searchUrl}/guardarpdf`, formData, { responseType: 'text' });
  }

  updatePostulacion(solicitud: SoliEstudiante, id: number): Observable<any> {
    return this.http.post(`${this.searchUrl}/editar/${id}`, solicitud);
  }

  obtenerPDF(id: number): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.searchUrl}/mostrarpdf/${id}`, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  getPostulantes(id: number): Observable<SoliEstudiante[]> {
    return this.http.get<SoliEstudiante[]>(`${this.searchUrl}/listarxconvocatoria2`, { params: { id } });
  }

  getPostulacionesEnviadas(id: number): Observable<SoliEstudiante[]> {
    return this.http.get<SoliEstudiante[]>(`${this.searchUrl}/listar/estud/usuario/${id}`);
  }

  getPostulantesByEstadoPend(id: number): Observable<SoliEstudiante[]> {
    return this.http.get<SoliEstudiante[]>(`${this.searchUrl}/listarpendientesxconvocatoria`, { params: { id } });
  }

  getPostulantesByEstadoAprob(id: number): Observable<SoliEstudiante[]> {
    return this.http.get<SoliEstudiante[]>(`${this.searchUrl}/listaraprobadasxconvocatoria`, { params: { id } });
  }

  listSoliEstudiante(): Observable<SoliEstudiante[]> {
    return this.http.get<SoliEstudiante[]>(`${this.searchUrl}/listar`);
  }

  searchSoliEstudianteById(id: number) {
    return this.http.get(`${this.searchUrl}/buscar/${id}`);
  }

  SoliEstudianteByConvoId(id: number): Observable<SoliEstudiante[]> {
    return this.http.get<SoliEstudiante[]>(`${this.searchUrl}/listaraprobadasxconvocatoria`, { params: { id } });
  }
}
