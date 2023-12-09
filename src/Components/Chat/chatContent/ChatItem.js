import React from 'react';

function ChatItem(props) {
    return (
        <div>
            <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${props.user ? props.user : ""}`}
      >
        <div className="chat__item__content tri-right.border.left-in">
          <div className="chat__msg">{props.msg}</div>
          {/* <div className="chat__meta">
            <span>16 mins ago</span>
            <span>Seen 1.03PM</span>
          </div> */}
        </div>
        {/* <Avatar isOnline="active" image={this.props.image} /> */}
      </div> 
        </div>
    );
}

export default ChatItem;