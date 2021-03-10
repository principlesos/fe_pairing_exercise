import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { notificationsReducer } from "./notifications";
import { userReducer } from "./user";

export const store = configureStore({
  reducer: {
    notificationState: notificationsReducer,
    userState: userReducer,
  },
  middleware: getDefaultMiddleware({ thunk: true, immutableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
