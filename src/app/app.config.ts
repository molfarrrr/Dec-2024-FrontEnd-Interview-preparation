import {
  ApplicationConfig, provideExperimentalCheckNoChangesForDebug,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withDebugTracing,
  withPreloading,
  withRouterConfig
} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FlagBasedPreloadingStrategy } from './flagbased-preloadingStrategy.service.ts';

export const appConfig: ApplicationConfig = {
  providers: [
    //provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      routes,
      // Features
      withComponentInputBinding(), // resolvers results and data directly to inputs of component associated with route
      withRouterConfig({
        onSameUrlNavigation: 'reload',

      }),
      withPreloading(FlagBasedPreloadingStrategy),
      withDebugTracing()
    ),
    provideAnimationsAsync(),
    provideExperimentalCheckNoChangesForDebug({
      exhaustive: true,
      interval: 1000,
      useNgZoneOnStable: false
    })
  ]
};
