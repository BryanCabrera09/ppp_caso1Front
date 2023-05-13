import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuario';
import { environment } from 'src/app/core/environment/environment';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "@firebase/app-compat";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _auth: AngularFireAuth) {
  }

  validateLoginDetails(user: Usuario) {
    window.sessionStorage.setItem("userdetails", JSON.stringify(user));
    return this.http.get(environment.rooturl + "/ingresar", { observe: 'response', withCredentials: true });
  }

   //Login With Firebase
   async login(email: string, password: string) {
    try {
      return await this._auth.signInWithEmailAndPassword(email, password);
    }
    catch (error) {
      alert("No se ha podido hacer el log-in correctamente. Error: " + error)
      console.log("No se ha podido hacer el log-in correctamente. Error: " + error);
      return null;
    }
  }

  async loginGoogle(email: string, password: string) {
    try {
      return await this._auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    catch (error) {
      //alert("No se ha podido hacer el log-in correctamente. Error: " + error)
      console.log("No se ha podido hacer el log-in correctamente. Error: " + error);
      return null;
    }
  }

}
