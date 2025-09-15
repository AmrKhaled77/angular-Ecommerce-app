import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import Swiper from 'swiper/bundle';



import { register } from 'swiper/element';


register();
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { Component, inject, OnInit, signal ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { provideToastr } from 'ngx-toastr';
import { errInterceptor } from './core/interciptors/err-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration:'top'
      })

      
    ), provideClientHydration(withEventReplay()),

     provideHttpClient(withFetch(), withInterceptors([errInterceptor])),
     provideAnimations(),
     provideToastr()
    
     
    
  ]
};


