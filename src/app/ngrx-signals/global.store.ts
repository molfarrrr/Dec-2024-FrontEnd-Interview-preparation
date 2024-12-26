import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type GlobalState = { userId: number };

const initialState: GlobalState = { userId: 121 };

export const GlobalStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods(
    store => ({
      updateUser(userId: number) {
        patchState(store, {userId});
      }
    })
  )
)
