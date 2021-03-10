import React from 'react';
import { Typography, Card } from 'antd';
import { AppNotification, removeNotification } from '../../store/notifications';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const IndividualNotification = ({ notification, index }: { notification: AppNotification,  index: number}) => {
  const dispatch = useDispatch();

  return(
    <Card
    style={{width: '500px' }}
      bordered
      extra={<DeleteOutlined onClick={() => { dispatch(removeNotification(notification.id))}} />}
      title={<Typography.Text strong>{`#${index + 1}: ${notification.title}`}</Typography.Text>}
    >
      <Typography.Text>{notification.message}</Typography.Text>
    </Card>
  );
}

export default IndividualNotification;