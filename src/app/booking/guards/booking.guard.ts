import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BookingComponent } from '../booking.component';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingGuard implements CanDeactivate<BookingComponent> {
  constructor(private _snackbar:MatSnackBar) {}
  canDeactivate(component: BookingComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): 
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    if (component.bookingForm.pristine) {
      return component.bookingForm.pristine;
    } else {
      this._snackbar.open("You have unsaved changes!", 'DISCARD');
      return false;
    }
  }
}
