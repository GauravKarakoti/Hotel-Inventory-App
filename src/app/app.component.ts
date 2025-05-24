import { Component, ElementRef, OnInit, ViewChild, Optional, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { RouterModule } from '@angular/router';
import { AppNavComponent } from "./app-nav/app-nav.component";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ConfigService } from './services/config.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'hinv-root',
  imports: [CommonModule, RouterModule, AppNavComponent,HttpClientModule, AppRoutingModule, MatSnackBarModule],
  templateUrl: './app.component.html',
  //template:"<h1>Hello world from inline template</h1>",
  styleUrl: './app.component.scss',
  //styles:["h1{color:red;}"]
})
export class AppComponent implements OnInit{
  title = 'hotelinventoryapp';
  @ViewChild('name',{static:true}) name!:ElementRef;
  constructor(
    @Optional() private loggerService:LoggerService, 
    @Inject(localStorageToken) private localStorage: any, 
    private initService: InitService,
    private configService: ConfigService
  ) { 
    console.log(initService.config)
  }
  ngOnInit()
  {
    this.loggerService.log("AppComponent.ngOnInit()");
    this.name.nativeElement.innerText="Hotel Inventory App";
    this.localStorage.setItem('name','Hilton Hotel');
  }
  // @ViewChild('user',{read:ViewContainerRef}) vcr!:ViewContainerRef;
  // ngAfterViewInit()
  // {
  //   const componentRef=this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms=50;
  // }
}
