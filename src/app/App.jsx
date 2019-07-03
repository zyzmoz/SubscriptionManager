import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import './assets/css/master.css';
import Menu from './components/Menu/Menu';
import Modal from './components/Modal/Modal';
import Customers from './pages/Customers/Customers';

const App = (props) => {
  console.log(props)
  return (
    <Router>
      <div className="main">
        <Modal />
        <Menu />
        <div className="view">
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/customers" component={Customers} />

        </div>
      </div>
    </Router>
  );
};

export default App;