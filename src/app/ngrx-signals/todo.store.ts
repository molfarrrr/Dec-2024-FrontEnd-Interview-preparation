import { ToDoData } from './store.model';
import {
  patchState,
  signalStore,
  signalStoreFeature, type,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState
} from '@ngrx/signals';
import { TodoService } from './todo.service';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import {
  addEntity, removeAllEntities,
  setAllEntities,
  updateAllEntities,
  updateEntity,
  withEntities
} from '@ngrx/signals/entities';
import { GlobalStore } from './global.store';

export type ToDoFilter = 'all' | 'active' | 'completed';

type TodoState = {
  filter: ToDoFilter;
}

const initialState: TodoState = {
  filter: 'all',
}

export const withLoading = () =>
  signalStoreFeature(
    withState({ loading: false }),
    withMethods(
      store => ({
        _setLoading(loading: boolean) {
          patchState(store, {loading})
        }
      })
    ),
  );

export const TodosStore = signalStore(
  withState<TodoState>(initialState),
  withEntities({ entity: type<ToDoData>(), collection: 'todo' }),
  withProps(() => ({
    _service: inject(TodoService),
    _globalStore: inject(GlobalStore),
  })),
  withComputed(
    store => ({
      countCompleted: computed(() => store.todoEntities().filter(x => x.completed).length),
      largestId: computed(() => store.todoEntities().map(x => x.id).sort().reverse()[0] || 0)
    })
  ),
  withComputed(
    store => ({
      countNotCompleted: computed(() => store.todoEntities().length - store.countCompleted()),
    })
  ),
  withLoading(),
  withMethods(
    store => ({
      _setTodos(data: ToDoData[]) {
        store._setLoading(false)
        // Set All Entities replace current entities with the given array
        patchState(store, removeAllEntities({ collection: 'todo' }));
        patchState(store, setAllEntities(data, { collection: 'todo' }))
      }
    })
  ),
  withMethods(
    store => ({
      /*
      * Get All TODOs
      * */
      getAll: rxMethod<void>(
        pipe(
          tap({
            next: () => store._setLoading(true)
          }),
          switchMap(() => {
            return store._service.getTodos()
              .pipe(
                tap({
                  next: data => {
                    store._setTodos(data);
                  },
                  error: () => {
                    store._setLoading(false)
                  }
                })
              )
          })
        )
      ),

      setTodoCompletenessAllTodos(completed: boolean): void {
        patchState(store, updateAllEntities({ completed }, { collection: 'todo' }));
      },

      setTodoCompleteness(completed: boolean, id: number) {
        patchState(store, updateEntity({id, changes: { completed }}, { collection: 'todo' }))
      },

      addTodo(data: ToDoData) {
        patchState(store, addEntity(data, { collection: 'todo' }));
        /*
        * Just an example of interaction between local & global stores
        * */
        store._globalStore.updateUser(data.id);
      }
    })
  ),
  withHooks(
    store => ({
      onInit: () => {
        store.getAll();
      }
    })
  ),
)
