import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/login.guard';

export const routes:Routes = [
  { path: 'employee', component: EmployeeComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'rooms', loadChildren: ()=> import("./rooms/rooms.module").then(m=>m.RoomsModule), canActivate: [LoginGuard]},
  {
    path: 'booking/:roomid',
    loadChildren: () => import('./booking/booking.module').then((m)=>m.BookingModule),
    canActivate: [LoginGuard]
  },
  { path: 'comment', loadChildren: () => import('./comment/comment.module').then(m => m.CommentModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
