
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Practica } from '../models/practica';
import { Observable } from 'rxjs';
import baserUrl from '../helpers/helperUrl';


@Injectable({
  providedIn: 'root'
})
export class PracticasService {

  private baseURL = `${baserUrl}/practica`;

  constructor(private httpClient: HttpClient) { }

  create(practica: Practica) {
    return this.httpClient.post(this.baseURL + '/crear', practica);
  }

  obtenerPractica(): Observable<Practica[]> {
    return this.httpClient.get<Practica[]>(`${this.baseURL}/listar`)
  }

  searchPracticaById(id: number) {
    return this.httpClient.get(`${this.baseURL}/buscar/${id}`);
  }

  editarPractica(id: number, practica: Practica): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/editar/${id}`, practica);
  }

  buscarxEstudiante(id: number) {
    return this.httpClient.get(`${this.baseURL}/buscarxestudiante/${id}`);
  }

  buscarxTutorEmp(id: number): Observable<Practica[]> {
    return this.httpClient.get<Practica[]>(`${this.baseURL}/buscar/practica/geren`, { params: { id } });
  }

  listarByTistaUsuario(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/listar/usuario/${id}`, { observe: 'response', withCredentials: true });
  }

  searchByConvo(id: number): Observable<Practica[]> {
    return this.httpClient.get<Practica[]>(`${this.baseURL}/listar/convocatoria/${id}`);
  }
}