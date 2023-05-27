import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';
import { Anexos } from '../models/anexos';

@Injectable({
  providedIn: 'root'
})
export class AnexosService {

  private anexoUrl = `${baserUrl}/anexos`;

  constructor(private http: HttpClient) { }

  registerAnexo(anexo: Anexos) {
    return this.http.post(this.anexoUrl + '/crear', anexo);
  }

  updateTutor(anexo: Anexos, url: string, id: number) {
    return this.http.post(`${this.anexoUrl}/editar/${id}`, anexo);
  }

  guardarPDF(archivo: File, id: number) {
    const formData = new FormData();
    formData.append('archivo', archivo, archivo.name);
    formData.append('id', id.toString());

    return this.http.post(`${this.anexoUrl}/guardarpdf`, formData, { responseType: 'text' });
  }
}
