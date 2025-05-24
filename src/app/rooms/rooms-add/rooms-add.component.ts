import { Component } from '@angular/core';
import { RoomList } from '../rooms';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'hinv-rooms-add',
  imports: [FormsModule, CommonModule],
  templateUrl: './rooms-add.component.html',
  styleUrl: './rooms-add.component.scss'
})
export class RoomsAddComponent {
  room : RoomList={
    roomType: '',
    amenities: '',
    checkInTime: new Date(),
    checkOutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0,
  } 
  successMessage: string='';
  constructor(private roomsService: RoomsService) {}
  AddRoom(roomsForm: NgForm) {
    this.roomsService.addRoom(this.room).subscribe((data)=>{
      this.successMessage='Room Added Successfully';
      roomsForm.reset({
        roomType: '',
        amenities: '',
        checkInTime: new Date(),
        checkOutTime: new Date(),
        photos: '',
        price: 0,
        rating: 0,
      });
    });
  }
}
