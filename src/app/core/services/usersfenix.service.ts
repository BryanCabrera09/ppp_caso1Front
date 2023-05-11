import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersfenixService {

  private searchUrl = `${baserUrl}/usuariofenix`;

  constructor(private http: HttpClient) { }

  searchStudent(cedula: string) {
    return this.http.get(`${this.searchUrl}/buscaralumnocedula/${cedula}`);
  }

}
