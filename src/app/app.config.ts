import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes, routerProviders } from './app.routes';
import { SITE_CONFIG, SITE_CONFIG_VALUE } from './core/site.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, ...routerProviders),
    { provide: SITE_CONFIG, useValue: SITE_CONFIG_VALUE },
  ],
};
