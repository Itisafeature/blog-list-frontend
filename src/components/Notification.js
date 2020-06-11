import React from 'react';

const Notification = ({ isErr, text }) => (
  <div className={isErr ? 'error' : 'notification'}>
    <h2>{text}</h2>
  </div>
);

export default Notification;
