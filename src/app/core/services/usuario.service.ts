import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Authority } from '../models/authority';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private searchUrl = `${baserUrl}/usuario`;

  constructor(private http: HttpClient) { }

  getRoles(rol: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.searchUrl}/listar/rol`, { params: { rol } });
  }

  ListarUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.searchUrl}/listar`)
  }

  ListUserAuthority(): Observable<Authority[]> {
    return this.http.get<Authority[]>(`${this.searchUrl}/authority/listar`)
  }

  actualizarRol(id: number, name: string) {
    const params = { name: name };
    return this.http.post(`${this.searchUrl}/authority/editar/${id}`, null, { params });
  }
}
