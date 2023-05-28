import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { Convenio } from '../models/convenio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  private searchUrl = `${baserUrl}/convenio`;

  constructor(private http: HttpClient) { }

  guardarConvenio(convenio: Convenio): Observable<Convenio> {
    return this.http.post<Convenio>(`${this.searchUrl}/crear`, convenio);
  }

  actualizarConvenio(id: number, convenio: Convenio): Observable<Convenio> {
    return this.http.put<Convenio>(`${this.searchUrl}/editar/${id}`, convenio);
  }

  listarcon(): Observable<Convenio[]>{
    return this.http.get<Convenio[]>(`${this.searchUrl}/listar`)
  }

  Buscarcon(id:Number){
    return this.http.get(`${this.searchUrl}/buscar/${id}`);
  }

  buscarxEmpresa(id:number){
    return this.http.get(`${this.searchUrl}/buscar/empresa/${id}`);
  }
}
