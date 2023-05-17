import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitudEmpresa } from '../models/solicitud-empresa';

@Injectable({
  providedIn: 'root'
})
export class SoliEmpresaService {
  private searchUrl = `${baserUrl}/solicitudEmpresa`;

  constructor(private http: HttpClient) {}

  ListarSoli(): Observable<SolicitudEmpresa[]>{
    return this.http.get<SolicitudEmpresa[]>(`${this.searchUrl}/listar`)
  }

  guardarsolicitud(solicitud:SolicitudEmpresa): Observable<SolicitudEmpresa>{
    return this.http.post<SolicitudEmpresa>(`${this.searchUrl}/crear`,solicitud);
  }

}
