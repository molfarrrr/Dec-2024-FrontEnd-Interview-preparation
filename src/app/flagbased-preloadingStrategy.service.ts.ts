import { PreloadingStrategy, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FlagBasedPreloadingStrategy extends PreloadingStrategy {
  override preload(
    route: Route,
    preload: () => Observable<any>,
  ): Observable<any> {
    return route.data?.['preload'] ? preload() : of(null);
  }
}
