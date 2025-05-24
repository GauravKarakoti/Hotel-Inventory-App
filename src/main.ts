/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// const appConfig: Appconfig = {
//   apiEndpoint: 'https://your-api-endpoint.com',
//   // Add other configuration values
// };
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
