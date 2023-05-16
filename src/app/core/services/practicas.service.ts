import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PracticasService {

  private baseURL = "http://localhost:8080/convocatoria/listar";

  constructor(private httpClient: HttpClient) { }

  /* obtenerConvocatoria(): Observable<Practicas[]> {
    return this.httpClient.get<ConvocatoriaP[]>(`${this.baseURL}`)
  } */
}
