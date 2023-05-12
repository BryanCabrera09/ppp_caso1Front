import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarreraMateriaService {

  private searchUrl = `${baserUrl}/carrera`;

  constructor(private http: HttpClient) { }

  searchCarrera(id: number) {
    return this.http.get(`${this.searchUrl}/buscar/${id}`);
  }

}
