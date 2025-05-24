import { Component, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-employee',
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  // providers: [RoomsService]
})
export class EmployeeComponent {
  empName: string = 'John';
  constructor(private roomsService: RoomsService) { }
}
