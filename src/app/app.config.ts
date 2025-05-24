import { ApplicationConfig, provideZoneChangeDetection, InjectionToken, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withXsrfConfiguration } from '@angular/common/http';
import { routes } from './app.routes';
import { InitService } from './init.service';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export function initializeApp(initService: InitService) {
  return () => initService.init();
}

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
    }
  ]
};
export interface Appconfig 
{
  apiEndpoint: string;
}
export const APP_CONFIG = new InjectionToken<Appconfig>('app.config');