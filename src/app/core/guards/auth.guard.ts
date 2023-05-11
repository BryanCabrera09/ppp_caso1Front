import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router
} from '@angular/router';
import { Usuario } from '../models/usuario';

@Injectable()
export class AuthGuard implements CanActivate {
  
  user = new Usuario();
    
    constructor(private router: Router){

    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
        if(sessionStorage.getItem('userdetails')){
            this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
        }
        if(!this.user){
            this.router.navigate(['login']);
        }
        return this.user?true:false;
    }

}
