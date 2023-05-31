import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';
import baserUrl from '../helpers/helperUrl';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  private searchUrl = `${baserUrl}/convocatoria`;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private httpClient: HttpClient) { }

  obtenerConvocatoria(): Observable<ConvocatoriaP[]> {
    return this.httpClient.get<ConvocatoriaP[]>(`${this.searchUrl}/listar`)
  }

  listarConvocatorias(): Observable<any> {
    return this.httpClient.get(`${baserUrl}/noticias`, { observe: 'response' })
  }

  guardaConvoca(convocatoria: ConvocatoriaP): Observable<ConvocatoriaP> {
    return this.httpClient.post<ConvocatoriaP>(`${this.searchUrl}/crear`, convocatoria, { headers: this.httpHeaders })
  }

  buscarxSolicitud(id: number) {
    return this.httpClient.get<ConvocatoriaP>(`${this.searchUrl}/buscar/solEmpresa/${id}`)
  }

  searchConvocatoriaById(id: number) {
    return this.httpClient.get(`${this.searchUrl}/buscar/${id}`);
  }
  traerNumero() {
    return this.httpClient.get(`${this.searchUrl}/buscar/ultimo`);
  }

  obtenerPDF(id: number): Observable<HttpResponse<Blob>> {
    return this.httpClient.get(`${this.searchUrl}/mostrarpdf/${id}`, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  guardarPDF(archivo: File, id: number) {
    const formData = new FormData();
    formData.append('archivo', archivo, archivo.name);
    formData.append('id', id.toString());

    return this.httpClient.post(`${this.searchUrl}/guardarpdf`, formData, { responseType: 'text' });
  }

}
