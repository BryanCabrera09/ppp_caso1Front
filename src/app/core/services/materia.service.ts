import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baserUrl from "../helpers/helperUrl";
import { Observable } from 'rxjs';
import { Materia } from "../models/materia";

@Injectable({
    providedIn: 'root'
  })

export class MateriaService {
    private ObjUrl = `${baserUrl}/materia`;

    constructor(private http: HttpClient) { }

    buscarMateria(id:number){
        return this.http.get(`${this.ObjUrl}/buscar/${id}`);
    }

    Listarmateria(): Observable<Materia[]> {
        return this.http.get<Materia[]>(`${this.ObjUrl}/listar`);
      }
}