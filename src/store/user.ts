import { Action, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { delay } from "../lib/util";

interface UserAvatar {
  id: string;
  avatarUrl: string;
}

interface User {
  id: string;
  name: string;
}

interface UserState {
  loggedInUsers: User[];
  currentUserId?: string;
  currentUserAvatarUrl?: string;
  fetchStatus: "idle" | "pending" | "rejected" | "fulfilled";
}

const initialState: UserState = {
  fetchStatus: "idle",
  loggedInUsers: [],
};

export const fetchLoggedInUsers = createAsyncThunk(
  "user/fetchLoggedinUsers",
  async () => {
    await delay(1000); // to simualate latency
    const response = await fetch("/users.json");
    const responseJson: User[] = await response.json();
    return responseJson;
  }
);

export const fetchUserAvatar = createAsyncThunk(
  "user/fetchAvatar",
  async ({ userId }: { userId: string }) => {
    await delay(1000); // to simualate latency
    const response = await fetch(`/user_avatars/${userId}.json`);
    const responseJson: UserAvatar = await response.json();
    return responseJson;
  }
);

export const setCurrentUserId = createAction<string>("user/setCurrentUser");

export const userReducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  if (fetchLoggedInUsers.pending.match(action)) {
    return {
      ...state,
      fetchStatus: "pending",
    };
  }
  if (fetchLoggedInUsers.fulfilled.match(action)) {
    return {
      ...state,
      loggedInUsers: action.payload,
      currentUserId: action.payload[0].id,
      fetchStatus: "fulfilled",
    };
  }
  if (fetchUserAvatar.pending.match(action)) {
    return {
      ...state,
      currentUserAvatarUrl: undefined,
    };
  }

  if (fetchUserAvatar.fulfilled.match(action)) {
    return {
      ...state,
      currentUserAvatarUrl: action.payload.avatarUrl,
    };
  }
  if (setCurrentUserId.match(action)) {
    return {
      ...state,
      currentUserId: action.payload,
    };
  }
  return state;
};
