import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baserUrl from "../helpers/helperUrl";
import { Observable } from 'rxjs';
import { Objetivomateria } from "../models/objetivo-materia";

@Injectable({
    providedIn: 'root'
  })

export class ObjetivoMateriaService{
    private ObjUrl = `${baserUrl}/objetivoMateria`;

    constructor(private http: HttpClient) { }

    Listarob(): Observable<Objetivomateria[]> {
        return this.http.get<Objetivomateria[]>(`${this.ObjUrl}/listar`);
      }
    Guardarobj(objetivo:Objetivomateria): Observable<Objetivomateria>{
      return this.http.post<Objetivomateria>(`${this.ObjUrl}/crear`, objetivo);
    }
}