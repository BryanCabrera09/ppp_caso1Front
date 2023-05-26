import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrera } from '../models/carrera';

@Injectable({
  providedIn: 'root'
})
export class CarreraMateriaService {

  private searchUrl = `${baserUrl}/carrera`;

  constructor(private http: HttpClient) { }

  searchCarrera(idCarrera: number) {
    return this.http.get(`${this.searchUrl}/buscar/idCarrera`, { params: { idCarrera } });
  }

  ListarCarrera(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.searchUrl}/listar`);
  }

}
