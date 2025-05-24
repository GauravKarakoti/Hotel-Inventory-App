import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoomGuard implements CanActivateChild {
  constructor(private loginService: LoginService) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean |UrlTree> | boolean | UrlTree {
    return this.loginService.isAdmin;
  }
}
