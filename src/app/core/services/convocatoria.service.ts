import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';
import baserUrl from '../helpers/helperUrl';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  private baseURL="http://localhost:8080/convocatoria/listar";
  private baseURL1="http://localhost:8080/convocatoria/crear";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private httpClient: HttpClient) { }

  obtenerConvocatoria():Observable<ConvocatoriaP[]>{
    return this.httpClient.get<ConvocatoriaP[]>(`${this.baseURL}`)
  }
  
  listarConvocatorias(): Observable<any> {
    return this.httpClient.get(baserUrl + '/noticias', { observe: 'response' })
  }

  guardaConvoca(convocatoria:ConvocatoriaP):Observable<ConvocatoriaP>{
    return this.httpClient.post<ConvocatoriaP>(`${this.baseURL1}`,convocatoria,{headers: this.httpHeaders})
  }
 
}
