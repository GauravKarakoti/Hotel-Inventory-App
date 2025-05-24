import { AfterViewChecked, Component, DoCheck, ViewChild, AfterViewInit, ViewChildren, SkipSelf } from '@angular/core';
import { Room , RoomList} from './rooms';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from "./rooms-list/rooms-list.component";
import { HeaderComponent } from "../header/header.component";
import { QueryList } from '@angular/core';
import { RoomsService } from './services/rooms.service';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ShareddataService } from '../services/shareddata.service';

@Component({
  selector: 'hinv-rooms',
  imports: [CommonModule, RoomsListComponent, RouterModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent implements DoCheck,AfterViewInit ,AfterViewChecked{
  hotelName = 'Hotel Inventory App';
  hideRooms=true;
  selectedRoom!:RoomList;
  numberOfRooms = 10;
  rooms:Room ={
    availableRooms:5,
    bookedRooms:5,
    totalRooms:10
  }
  title='Room List';
  roomList :RoomList[]= [];
  stream=new Observable<string>((observer)=>{
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent) headerChildrenComponent!:QueryList<HeaderComponent>;
  // roomService=new RoomsService();
  error: string='';
  totalBytes=0;
  subscription!:Subscription;
  error$=new Subject<string>();
  getError$=this.error$.asObservable();
  rooms$;
  roomsCount$;
  priceFilter;
  constructor(@SkipSelf() private roomsService: RoomsService, private confiSerice: ConfigService, private sharedDataService: ShareddataService) { 
    this.rooms$=this.roomsService.getRooms$.pipe(
      catchError((err)=>{
        console.log(err);
        this.error$.next(err.message);
        return of([]);
      })
    );
    this.priceFilter=new FormControl<number>(0);
    console.log(this.priceFilter)
    this.roomsCount$=this.roomsService.getRooms$.pipe(
      map((rooms)=>rooms.length)
    )
  }
  ngOnInit():void
  {
    this.roomsService.getPhotos().subscribe((event)=>{
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log("Request has been made!");
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log("Request success!");
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes+=event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    })
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Completed'),
      error: (err) => console.log(err)
    });
    this.stream.subscribe((data) => console.log(data));
    // this.roomsService.getRooms$.subscribe(rooms=>{
    //   this.roomList = rooms;
    // });
  }
  ngDoCheck(): void {
    console.log("On changes is called");
  }
  ngAfterViewInit():void
  {
    // this.headerComponent.title = 'Rooms View';
    // this.headerChildrenComponent.last.title="Last Title";
    // this.headerChildrenComponent.get(0).title="First Title";
  }
  ngAfterViewChecked():void
  {
    
  }
  toggle()
  {
    this.hideRooms = !this.hideRooms;
    this.title='Rooms List';
  }
  selectRoom(room: RoomList)
  {
    this.selectedRoom = room;
  }
  addRoom()
  {
    const room:RoomList={
      // roomNumber:'104',
      roomType:'Standard',
      amenities:'AC,TV,Mini Fridge,Queen Size Bed',
      price:3000,
      photos:"https://imgs.search.brave.com/XldIK1glBFQBIteUDPhDZ5dwPuykbyXmutNFpbpCpUs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tb2Rlcm4tbGl2/aW5nLXJvb20taW50/ZXJpb3ItZGVzaWdu/LWxpZ2h0LXdvb2Qt/Y29tZnktY2hhaXIt/cGxhbnRfNDY2ODYt/NzA1LmpwZz9zZW10/PWFpc19oeWJyaWQ",
      checkInTime:new Date('2021-06-01'),
      checkOutTime:new Date('2021-06-10'),
      rating:3.5312
    };
    // this.roomList.push(room);
    this.roomsService.addRoom(room).subscribe((data)=>{
      this.roomList=data;
    })
  }
  editRoom()
  {
    const room:RoomList={
      roomNumber:'103',
      roomType:'Standard',
      amenities:'AC,TV,Mini Fridge,Queen Size Bed',
      price:3000,
      photos:"https://imgs.search.brave.com/XldIK1glBFQBIteUDPhDZ5dwPuykbyXmutNFpbpCpUs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tb2Rlcm4tbGl2/aW5nLXJvb20taW50/ZXJpb3ItZGVzaWdu/LWxpZ2h0LXdvb2Qt/Y29tZnktY2hhaXIt/cGxhbnRfNDY2ODYt/NzA1LmpwZz9zZW10/PWFpc19oeWJyaWQ",
      checkInTime:new Date('2021-06-01'),
      checkOutTime:new Date('2021-06-10'),
      rating:3.5312
    };
    this.roomsService.editRoom(room).subscribe((data)=>{
      this.roomList=data;
    });
  }
  deleteRoom() {
    this.roomsService.delete('3').subscribe((data)=>{
      this.roomList=data;
    });
  }
  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}