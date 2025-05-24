import { ActivatedRouteSnapshot, CanActivate, CanLoad, GuardResult, MaybeAsync, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate, CanLoad {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean |UrlTree> | boolean | UrlTree {
    return this.loginService.isLoggedIn? true: this.router.navigate(['/login']);
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean |UrlTree> | boolean | UrlTree {
    return this.loginService.isLoggedIn;
  }
}
