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

  obtenerPractica(): Observable<Practica[]> {
    return this.httpClient.get<Practica[]>(`${this.baseURL}/listar`)
  }

  searchPracticaById(id: number) {
    return this.httpClient.get(`${this.baseURL}/buscar/${id}`);
  }
}
