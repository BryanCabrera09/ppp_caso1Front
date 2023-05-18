import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baserUrl from '../helpers/helperUrl';

@Injectable({
  providedIn: 'root'
})
export class PracticaService {

  url: string = "/practica"

  constructor(private http: HttpClient) { }

  listarByUsuario(id: number): Observable<any> {
    return this.http.get<any>(`${baserUrl+this.url}/listar/usuario/${id}`, { observe: 'response', withCredentials: true });
  }

}
