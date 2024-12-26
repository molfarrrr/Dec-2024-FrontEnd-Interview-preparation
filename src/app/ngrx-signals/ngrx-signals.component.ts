import { Component, inject, Signal } from '@angular/core';
import { TodosStore } from './todo.store';
import { TodoService } from './todo.service';
import { ToDoData } from './store.model';

@Component({
  selector: 'app-ngrx-signals',
  imports: [],
  templateUrl: './ngrx-signals.component.html',
  styleUrl: './ngrx-signals.component.css',
  providers: [
    TodosStore,
    TodoService
  ]
})
export class NgrxSignalsComponent {
  private readonly store = inject(TodosStore);

  readonly todos: Signal<ToDoData[]> = this.store.todoEntities;
  readonly countCompleted: Signal<number> = this.store.countCompleted;
  readonly countNotCompleted: Signal<number> = this.store.countNotCompleted;
  readonly loading: Signal<boolean> = this.store.loading;

  setTodoCompleteness(completed: boolean, id: number) {
    this.store.setTodoCompleteness(completed, id);
  }

  completeAll() {
    this.store.setTodoCompletenessAllTodos(true);
  }

  resetAll() {
    this.store.setTodoCompletenessAllTodos(false);
  }

  addTodo(todo: string) {
    this.store.addTodo({
      id: this.store.largestId() + 1,
      completed: false,
      name: todo
    } as ToDoData)
  }

  reloadTodos() {
    this.store.getAll();
  }
}
