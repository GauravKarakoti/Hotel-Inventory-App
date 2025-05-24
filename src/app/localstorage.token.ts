import { InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export const localStorageToken = new InjectionToken<Storage>('local storage', {
    providedIn:'root',
    factory() 
    {
        if (isPlatformBrowser(PLATFORM_ID)) 
        {
            return window.localStorage;
        }
        return {} as Storage; 
    }
});