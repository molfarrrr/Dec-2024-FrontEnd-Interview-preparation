import { createActionGroup, createFeature, createReducer, createSelector, emptyProps, props } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { ToDoData } from '../ngrx-signals/store.model';

export const todoFeatureKey = 'todos';

export interface TodoState {
  todos: ToDoData[];
  loading: boolean;
  error: string;
}

export const todoActions = createActionGroup({
  source: todoFeatureKey,
  events: {
    'Get All': emptyProps(),
    'Get All Success': props<{data: ToDoData[]}>(),
    'Get All Error': props<{error: string}>(),
    'Set Complete For All': props<{completed: boolean}>(),
    'Set Complete': props<{completed: boolean, id: number}>(),
    'Add Todo': props<{data: ToDoData}>()
  }
})

const initialState: TodoState = {
  loading: false,
  todos: [],
  error: ''
}

export const todoReducer = createReducer(
  initialState,

  immerOn(todoActions.getAll, state => {
    state.loading = true;
  }),

  immerOn(todoActions.getAllSuccess, (state, { data }) => {
    state.todos = data;
    state.loading = false
  }),

  immerOn(todoActions.getAllError, (state, { error }) => {
    state.error = error;
    state.loading = false;
  }),

  immerOn(todoActions.addTodo, (state, { data }) => {
    state.todos.push(data)
  }),

  immerOn(todoActions.setComplete, (state, {completed, id}) => {
    const todo = state.todos.find(x => x.id === id);
    if (todo) {
      todo.completed = completed;
    }
  }),

  immerOn(todoActions.setCompleteForAll, (state, {completed}) => {
    state.todos.forEach(x => {x.completed = completed});
  })
);

export const todoFeature = createFeature({
  name: todoFeatureKey,
  reducer: todoReducer,
  extraSelectors: ({selectTodos}) => {
    const selectCompletedCount = createSelector(
      selectTodos,
      (todos) => todos.filter(x => x.completed).length
    );

    const selectNotCompletedCount = createSelector(
      selectTodos,
      selectCompletedCount,
      ({length}, completed) => length - completed
    );

    const selectLargestId = createSelector(
      selectTodos,
      todos => todos.map(x => x.id).sort().reverse()[0] || 0
    )

    return {selectCompletedCount, selectNotCompletedCount, selectLargestId}
  }
});

export const  {
  reducer,
  selectTodosState,
  selectLoading,
  selectTodos,
  selectLargestId,
  selectNotCompletedCount,
  selectCompletedCount
} = todoFeature;
