import { createAction, Action, createAsyncThunk } from "@reduxjs/toolkit";
import { delay } from "../lib/util";

export interface AppNotification {
  title: string;
  message: string;
  id: string;
}

interface NotificationState {
  notifications: AppNotification[];
  fetchStatus: "idle" | "pending" | "rejected" | "fulfilled";
  filter: string;
}

const initialState: NotificationState = {
  notifications: [],
  fetchStatus: "idle",
  filter: "",
};

export const filterNotifications = createAction<string>("notifications/filter");

export const removeNotification = createAction<string>("notifications/remove");

export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async () => {
    await delay(1000); // to simualate latency
    const response = await fetch("/notifications.json");
    const responseJson: AppNotification[] = await response.json();
    return responseJson;
  }
);

export const notificationsReducer = (
  state: NotificationState = initialState,
  action: Action
): NotificationState => {
  if (removeNotification.match(action)) {
    state.notifications = state.notifications.filter(
      (n) => (n.id = action.payload)
    );
    return state;
  } else if (filterNotifications.match(action)) {
    return { ...state, filter: action.payload };
  } else if (fetchNotifications.pending.match(action)) {
    return { ...state, fetchStatus: "pending" };
  } else if (fetchNotifications.rejected.match(action)) {
    return { ...state, fetchStatus: "rejected" };
  } else if (fetchNotifications.fulfilled.match(action)) {
    return {
      ...state,
      fetchStatus: "fulfilled",
      notifications: action.payload,
    };
  } else {
    return state;
  }
};
