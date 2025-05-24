import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    HeaderModule,
  ]
})
export class RoomsModule { }
