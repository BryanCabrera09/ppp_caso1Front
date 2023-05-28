import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from '../models/resultado';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  private resltado = `${baserUrl}/resultado`;

  constructor(private http: HttpClient) { }

  crearMuchos(resultados: Resultado[]): Observable<any> {
    const url = `${this.resltado}/crear/muchos`;
    return this.http.post(url, resultados);
  }

}
