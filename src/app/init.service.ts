import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  config: any;
  private readonly configPath = '/assets/config.json';
  
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  init() {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get(this.configPath).pipe(
        tap(config => {
          console.log('Configuration loaded successfully');
          this.config = config;
        }),
          catchError(error => {
            console.error('Error loading config:', error);
            this.config = { 
              apiEndpoint: 'http://localhost:4200',
              apiVersion: 'v1',
              kind: 'Pod'
            };
            return of(this.config);
          })
      );
    }
    return of({ apiEndpoint: 'http://localhost:4200' });
  }
}