import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardRotaGuard implements CanActivate {

  private constructor(private router: Router, private service: LoginService){}

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      const requiredRoles = next.data['requiredRoles'];

      if (!this.service.getIsLogged()) {
        this.router.navigate(['/']);
        return false;
      }
      const realRol = this.service.getIsAdmin() ? 'admin' : 'user';
      if (requiredRoles.indexOf(realRol) === -1) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

}
