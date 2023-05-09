import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable,of } from 'rxjs';
import { empresa } from './empresa';
@Injectable({
  providedIn: 'root'
})
export class RegEmpresaServiceService {

  private urlendpoint:string='http://localhost:8080/empresa/crear';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) {}


  create(empresa:empresa):Observable<empresa>{
    return this.http.post<empresa>(this.urlendpoint, empresa,{headers: this.httpHeaders})
  }

}
