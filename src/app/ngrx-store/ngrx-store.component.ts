import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCompletedCount, selectLargestId,
  selectLoading,
  selectNotCompletedCount,
  selectTodos,
  todoActions
} from '../store/feature';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-ngrx-store',
  imports: [
    AsyncPipe
  ],
  templateUrl: './ngrx-store.component.html',
  styleUrl: './ngrx-store.component.css'
})
export class NgrxStoreComponent {
  store = inject(Store);

  constructor() {
    this.reloadTodos()
  }

  loading = this.store.selectSignal(selectLoading);
  todos = this.store.selectSignal(selectTodos);
  largestId = this.store.selectSignal(selectLargestId);
  countCompleted = this.store.select(selectCompletedCount);
  countNotCompleted = this.store.select(selectNotCompletedCount);

  completeAll() {
    this.store.dispatch(todoActions.setCompleteForAll({completed: true}));
  }

  resetAll() {
    this.store.dispatch(todoActions.setCompleteForAll({completed: false}));
  }

  addTodo(value: string) {
    this.store.dispatch(todoActions.addTodo({
      data: {
        id: this.largestId() + 1,
        completed: false,
        name: value
      }
    }));
  }

  reloadTodos() {
    this.store.dispatch(todoActions.getAll());
  }

  setTodoCompleteness(completed: boolean, id: number) {

  }
}
