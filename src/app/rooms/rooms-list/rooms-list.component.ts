import { Component, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomList } from '../rooms';
import { EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'hinv-rooms-list',
  imports: [CommonModule, RouterModule, FilterPipe],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnChanges, OnDestroy{
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes['title'])
    {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }
  @Input() rooms: RoomList[]= [];
  @Input() title: string = '';
  @Output() selectedRoom= new EventEmitter<RoomList>();
  @Input() price=0;
  selectRoom(room: RoomList)
  {
    this.selectedRoom.emit(room);
  }
  ngOnDestroy():void
  {
    console.log("on destroy is called");
  }
}
