import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { Convenio } from '../models/convenio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  private searchUrl = `${baserUrl}/convenio`;

  constructor(private http: HttpClient) { }

  guardarConvenio(convenio: Convenio): Observable<Convenio>{
    return this.http.post<Convenio>(`${this.searchUrl}/crear`, convenio);
  }

}
