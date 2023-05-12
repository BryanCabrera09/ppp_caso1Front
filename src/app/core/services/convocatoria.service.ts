import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  private baseURL="http://localhost:8080/convocatoria/listar";

  constructor(private httpClient: HttpClient) { }

  obtenerConvocatoria():Observable<ConvocatoriaP[]>{
    return this.httpClient.get<ConvocatoriaP[]>(`${this.baseURL}`)
  }

 
}
