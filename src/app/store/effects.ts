import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { TodoService } from '../ngrx-signals/todo.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { todoActions } from './feature';

export const getAllTodos = createEffect(
  (actions$ = inject(Actions), service = inject(TodoService)) =>
    actions$
      .pipe(
        ofType(todoActions.getAll),
        exhaustMap(() =>
          service.getTodos().pipe(
            map(x => todoActions.getAllSuccess({data: x})),
            catchError(x => of(todoActions.getAllError({error: x})))
          )
        )
      ),
  { functional: true }
);
