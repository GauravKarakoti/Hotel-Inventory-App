import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import { RoomsService } from './services/rooms.service';
import { ConfigService } from '../services/config.service';
import { ShareddataService } from '../services/shareddata.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { RouteConfigToken } from '../services/routeConfig.service';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsComponent, HttpClientTestingModule],
      providers: [RoomsService, ConfigService, ShareddataService, {
        provide: APP_SERVICE_CONFIG,
        useValue: { apiEndpoint:'http://localhost:3000' }
      },{
        provide: RouteConfigToken,
        useValue: {title:"rooms"} 
      }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should toggle',()=>{
    component.hideRooms = false;
    component.toggle();
    expect(component.hideRooms).toBe(true);
  })
});
