import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomGuard } from './guards/room.guard';
import { LoginGuard } from '../guards/login.guard';

const routes: Routes = [
  { path: '', component: RoomsComponent, canActivateChild: [RoomGuard], canLoad: [LoginGuard], children: [
    { path: 'add', component: RoomsAddComponent },
    // { path: ':roomid', component: RoomsBookingComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
