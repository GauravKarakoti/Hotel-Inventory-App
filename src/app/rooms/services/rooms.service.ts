import { Injectable, Inject } from '@angular/core';
import { RoomList } from '../rooms';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { catchError, of, shareReplay } from 'rxjs';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  roomList: RoomList[]=[];
  // headers=new HttpHeaders({'token':'32bgu2l13r8fh3i'});
  getRooms$;
  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig , private http:HttpClient) { 
    console.log(this.config.apiEndpoint);
    console.log("Rooms Service Initialized ...");
    this.getRooms$ = this.http.get<RoomList[]>('/api/rooms',{
      // headers:this.headers
    }).pipe(
      shareReplay(1),
      catchError(error => {
        console.error('API Error:', error);
        return of([]);
      })
    )
  }
  getRooms()
  {
    return this.http.get<RoomList[]>('/api/rooms');
  }
  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms',room,{
      // headers:this.headers
    });
  }
  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`,room);
  }
  delete(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }
  getPhotos() {
    const request=new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`,{
      reportProgress:true,
    });
    return this.http.request(request);
  }
}
