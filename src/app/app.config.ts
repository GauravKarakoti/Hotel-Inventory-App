import { ApplicationConfig, provideZoneChangeDetection, InjectionToken, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withXsrfConfiguration } from '@angular/common/http';
import { routes } from './app-routing.module';
import { InitService } from './init.service';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { RouteConfigToken } from './services/routeConfig.service';
import { APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';

export function initializeApp(initService: InitService) {
  return () => initService.init();
}

export const APP_CONFIG = new InjectionToken<Appconfig>('app.config');
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' })),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [InitService],
      multi: true
    },
    {
      provide: RouteConfigToken,
      useValue: { title: 'HotelInventoryApp' } 
    },
    {
      provide: APP_CONFIG, 
      useFactory: (initService: InitService) => initService.config,
      deps: [InitService]
    },
    {
      provide: APP_SERVICE_CONFIG, // Use the unified token
      useFactory: (initService: InitService) => initService.config,
      deps: [InitService]
    }
  ]
};
export interface Appconfig 
{
  apiEndpoint: string;
}