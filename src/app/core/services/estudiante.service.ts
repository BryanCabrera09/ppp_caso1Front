import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private baseURL = `${baserUrl}/estudiante`;

  constructor(private httpClient: HttpClient) { }

  buscarxUsuario(id: number) {
    return this.httpClient.get(`${this.baseURL}/buscarxusuario/` + id);
  }

  listarest(): Observable<Estudiante[]>{
    return this.httpClient.get<Estudiante[]>(`${this.baseURL}/listar`)
  }

  buscartxTutorA(id: number){
   return this.httpClient.get(`${baserUrl}/listarxtutoracademico/${id}`) 
  }

}
