import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Practicante } from '../models/practicante';
import baserUrl from '../helpers/helperUrl';

@Injectable({
  providedIn: 'root'
})
export class SolipracticantesService {

  constructor(private http: HttpClient) { }

  create(practicante: Practicante) {
    return this.http.post(`${baserUrl}/solicitudEstudiante/`, practicante);
  }

  getPostulantes() {
    return this.http.get<Practicante[]>(`${baserUrl}/solicitudEstudiante/listar`);
  }
}
