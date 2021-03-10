import React from 'react';
import { AppNotification } from '../../store/notifications';
import IndividualNotification from './IndividualNotification';

const NotificationList = ({ notifications }: { notifications: AppNotification[]}) => {
  return (
    <div style={{ margin: 'auto', width: '500px', padding: '10px', maxHeight: 'calc(100vh - 174px)', overflow: 'scroll' }}>
      {
        notifications.map((notification, index) => (
          <IndividualNotification index={index} key={notification.id} notification={notification} />
        ))
      }
    </div>
  )
}
export default NotificationList;