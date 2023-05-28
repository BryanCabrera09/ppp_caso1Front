import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadoCarreraService {

  private resltado = `${baserUrl}/resultadoMateria`;

  constructor(private http: HttpClient) { }

  listarPorCarreraId(id: number): Observable<any> {
    const url = `${this.resltado}/listar/carrera/${id}`;
    return this.http.get(url);
  }

}
