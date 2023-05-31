import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { Observable } from 'rxjs';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Visita } from '../models/visita';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  private searchUrl = `${baserUrl}/visita`;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  
  constructor(private http: HttpClient,) { }

  createVisita(visita: Visita): Observable<Visita> {
    return this.http.post<Visita>(this.searchUrl + '/crear', visita, { headers: this.httpHeaders })
  }

  
  buscarVisita(id: number): Observable<Visita> {
    return this.http.get<Visita>(`${this.searchUrl}/buscar/ultima/practica/${id}`);
  }
}
