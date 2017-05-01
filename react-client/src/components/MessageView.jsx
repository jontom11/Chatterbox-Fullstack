import React from 'react';

const MessageView = (props) => (
  <div>
    <h4> Message Viewer </h4>
    <ul>
    {props.msgList.map(msg => (<li>{msg.username} <br></br> message: {msg.message}</li>))}
    </ul>
  </div>
)

export default MessageView;