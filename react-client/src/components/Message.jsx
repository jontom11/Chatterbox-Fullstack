import React from 'react';



const Message = (props) => (
  <div>
    <input type="text" value={props.value} onChange={props.onChange} placeholder="Message..."/>
    <input type="button" value='Post Message' onClick={props.clicked} />
  </div>
)

export default Message;