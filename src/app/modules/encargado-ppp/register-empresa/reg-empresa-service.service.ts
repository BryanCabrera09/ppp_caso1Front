import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable,of } from 'rxjs';
import { Empresa } from 'src/app/core/models/empresa';
@Injectable({
  providedIn: 'root'
})
export class RegEmpresaServiceService {

  private urlendpoint:string='http://localhost:8080/empresa/crear';
  private urlendpoint2:string='http://localhost:8080/empresa/listar';
  private urlEditar:string='http://localhost:8080/empresa/editar/';
  private urlBuscar:string='http://localhost:8080/empresa//buscar/';


  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) {}


  create(empresas:Empresa):Observable<Empresa>{
    return this.http.post<Empresa>(this.urlendpoint, empresas,{headers: this.httpHeaders})
  }

  obtenerempresas(): Observable<Empresa[]>{
    return this.http.get<Empresa[]>(this.urlendpoint2)
  }


  buscarporxID(id: Number): Observable<Empresa[]>{

    let res = this.urlBuscar+id
    return this.http.get<Empresa[]>(res);
  }

  actualizar(id: number, empresas: Empresa): Observable<Empresa>{
    let res = this.urlEditar+id
    return this.http.put<Empresa>(res, empresas);
  }

}
