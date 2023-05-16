import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baserUrl from "../helpers/helperUrl";
import { Observable } from 'rxjs';
import { SolicitudEmpresa } from "../models/solicitud-empresa";



@Injectable({
    providedIn: 'root'
  })

export class SolicitudEmpresaService{
    private ObjUrl = `${baserUrl}/ObjetivoMateria`;

    constructor(private http: HttpClient) { }

    Listarob(): Observable<SolicitudEmpresa[]> {
        return this.http.get<SolicitudEmpresa[]>(`${this.ObjUrl}/listar`);
      }
}