import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baserUrl from "../helpers/helperUrl";

@Injectable({
    providedIn: 'root'
  })

export class ObjetivoMateriaService{
    private ObjUrl = `${baserUrl}/ObjetivoMateria/`;

    constructor(private http: HttpClient) { }
}