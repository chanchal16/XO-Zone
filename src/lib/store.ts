import { configureStore } from "@reduxjs/toolkit";
import singleModeReducer from "./features/single-player/singlePlayerSlice";
import persistStateMiddleware from "./features/single-player/storage-middleware";
import multiModeReducer from "./features/multi-player/multiPlayerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      singleMode: singleModeReducer,
      multiMode: multiModeReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(persistStateMiddleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];