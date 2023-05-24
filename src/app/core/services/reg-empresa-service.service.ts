import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable, of } from 'rxjs';
import { Empresa } from 'src/app/core/models/empresa';
import baserUrl from '../helpers/helperUrl';
@Injectable({
  providedIn: 'root'
})
export class RegEmpresaServiceService {

  private searchUrl = `${baserUrl}/empresa`;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }


  create(empresas: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.searchUrl + '/crear', empresas, { headers: this.httpHeaders })
  }

  obtenerempresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.searchUrl}/listar`)
  }

  buscarporxID1(id: number) {
    return this.http.get(`${this.searchUrl}/buscar/${id}`);
  }

  buscarporxID(id: number): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.searchUrl}/buscar/${id}`);
  }

  actualizar(id: number, empresas: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(`${this.searchUrl}/editar/${id}`, empresas);
  }

}
