import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ToDoData } from './store.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  getTodos(): Observable<ToDoData[]> {
    return of([
      {
        id: 1,
        name: 'Learn NgRx',
        completed: false
      },
      {
        id: 2,
        name: 'Learn Signals Basics',
        completed: true
      },
      {
        id: 3,
        name: 'Learn Angular Material Theming',
        completed: false
      },
      {
        id: 4,
        name: 'Learn Angular v19 new things',
        completed: false
      }
    ]).pipe(delay(2000));
  }
}
