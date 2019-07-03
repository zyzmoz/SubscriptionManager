import React from 'react';
import { Link, withRouter } from 'react-router-dom';


const Menu = (props) => {
  const { pathname } = props.location;  
  return (
    <div className="menu">
      <div className="header">
        Menu
      </div>
      <ul className="actions">
        <Link to="/"><li className={pathname === '/'?'active': ''}>Início</li></Link>
        <Link to="customers"><li className={pathname === '/customers'?'active': ''}>Clientes</li></Link>
      </ul>
      
    </div>
  );
};

export default withRouter(Menu);