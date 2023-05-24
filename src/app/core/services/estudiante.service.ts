import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private baseURL = `${baserUrl}/estudiante`;
  constructor(private httpClient: HttpClient) { }

  buscarxEstudainte(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/buscarxusuario/`+id);
  }

}
