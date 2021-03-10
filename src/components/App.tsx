import React, { useEffect } from "react";
import { Layout, Typography } from "antd";
import "./App.css";
import NotificationList from "./notifications/NotificationList";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  fetchNotifications,
  filterNotifications,
} from "../store/notifications";
import HeaderContent from "./Header/HeaderContent";
import { fetchLoggedInUsers, fetchUserAvatar } from "../store/user";

const App = () => {
  const notificationsState = useSelector(
    (state: RootState) => state.notificationState
  );

  const currentUserId = useSelector(
    (state: RootState) => state.userState.currentUserId
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLoggedInUsers());
  }, [dispatch]);

  return (
    <Layout className="App">
      <Layout.Header
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <HeaderContent
          setFilter={(input: string) => dispatch(filterNotifications(input))}
          numNotifications={notificationsState.notifications.length}
          fetchAvatar={
            currentUserId
              ? () =>
                  dispatch(
                    fetchUserAvatar({
                      userId: currentUserId,
                    })
                  )
              : () => {}
          }
        />
      </Layout.Header>
      <Layout.Content>
        <Typography.Title level={2}>Notifications</Typography.Title>
        <NotificationList
          notifications={notificationsState.notifications.filter((n) =>
            n.title
              .toLowerCase()
              .includes(notificationsState.filter.toLowerCase())
          )}
        />
      </Layout.Content>
      <Layout.Footer>Hello world! I am a footer!</Layout.Footer>
    </Layout>
  );
};

export default App;
