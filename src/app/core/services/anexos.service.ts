import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Anexos } from '../models/anexos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnexosService {

  private anexoUrl = `${baserUrl}/anexos`;

  constructor(private http: HttpClient) { }

  registerAnexo(anexo: Anexos) {
    return this.http.post(this.anexoUrl + '/crear', anexo);
  }

  updateTutor(anexo: Anexos, id: number) {
    return this.http.post(`${this.anexoUrl}/editar/${id}`, anexo);
  }

  listarPorTipo(idpractica: number, tipo: number) {
    const url = `${this.anexoUrl}/listarxtipo/${idpractica}`;
    return this.http.get(url, { params: { tipo } });
  }

  guardarPDF(archivo: File, id: number) {
    const formData = new FormData();
    formData.append('archivo', archivo, archivo.name);
    formData.append('id', id.toString());

    return this.http.post(`${this.anexoUrl}/guardarpdf`, formData, { responseType: 'text' });
  }

  obtenerPDF(id: number): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.anexoUrl}/mostrarpdf/${id}`, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}
