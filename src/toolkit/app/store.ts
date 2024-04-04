import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";

const combinedReducer = combineReducers({
  user: userSlice,
});

export default function createStore(preloadedState?: RootState) {
  const store = configureStore({
    reducer: combinedReducer,
    preloadedState: preloadedState,
  });
  return store;
}

export type RootState = ReturnType<typeof combinedReducer>;
export type AppState = ReturnType<typeof createStore>;
