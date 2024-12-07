import {ApplicationConfig, provideZoneChangeDetection, LOCALE_ID} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    CookieService,
    {provide: LOCALE_ID, useValue: 'es'}
  ]
};
