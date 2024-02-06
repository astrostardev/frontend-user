import React from 'react';
import ChatBody from './chatBody/ChatBody';
import Sidebar from '../../Pages/Sidebar';
import OffCanvasNav from '../../Pages/OffCanvasNav';
function Chats(props) {
    return (
      <div  style={{ display:"flex",flexDirection:"column"}}>
        <div> 
        <div id='fixedbar'>
    <Sidebar/>
    </div>
    <div id='offcanvas'>
    <OffCanvasNav/>
    </div>
        </div>
       
        <div className='__main'>
       
          <ChatBody/> 
        </div>
        </div>
    );
}

export default Chats;