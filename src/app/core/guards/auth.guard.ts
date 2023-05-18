import { Injectable } from '@angular/core';
import {
    CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router
} from '@angular/router';
import { Usuario } from '../models/usuario';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

    user = new Usuario();

    constructor(private storageService: StorageService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isLoggedIn = this.storageService.isLoggedIn();
        const expectedRoles = route.data['expectedRoles'];
        const role = this.storageService.getRole();
        if (isLoggedIn && expectedRoles.includes(role)) {
            return true;
          }
        this.router.navigate(['../login']);
        return false;
    }

}
