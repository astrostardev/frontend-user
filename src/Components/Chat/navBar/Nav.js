import React from 'react';
import facebook from '../../../assests/Facebook.svg';
import './navbar.css'
function Nav(props) {
    return (
        <div className="nav">
        <div className="nav__blocks">
          <img src={facebook} alt="logo"/>
        </div>
        <div className="nav__blocks"></div>
        <div className="nav__blocks"></div>
      </div>
    );
}

export default Nav;