import React from 'react';
import ChatBody from './chatBody/ChatBody';
import Sidebar from '../Sidebar';
import OffCanvasNav from '../OffCanvasNav';
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
       
        <div className='__main' style={{margin:"auto 17.7rem"}}>
       
          <ChatBody/> 
        </div>
        </div>
    );
}

export default Chats;