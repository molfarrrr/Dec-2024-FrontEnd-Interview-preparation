import {
  ApplicationConfig, provideExperimentalCheckNoChangesForDebug,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    //provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideExperimentalCheckNoChangesForDebug({
      exhaustive: true,
      interval: 1000,
      useNgZoneOnStable: false
    })
  ]
};
