import React, { Component } from 'react';
import { Button, Table, Dropdown } from 'react-bulma-components';
import { openModal, closeModal } from '../../actions/modal';
import {connect} from 'react-redux';
import SubscriptionForm from '../../components/Subscription/SubscriptionForm';

const mapState = (state) => ({
  ...state
});

const actions = {
  openModal,
  closeModal
}

class Dashboard extends Component {  
  render() {
    return (
      <div className="dashboard">
        <div className="header">
          <div className="title">
            Lista
          </div>
          <div className="actions wrapper">
            <Button onClick={() => this.props.openModal(<SubscriptionForm/>)} color="success">Novo Registro</Button>
            <Dropdown value="1">
              <Dropdown.Item value="1">Todos</Dropdown.Item>
              <Dropdown.Item value="2">Recebidos</Dropdown.Item>
              <Dropdown.Item value="3">A Receber</Dropdown.Item>
            </Dropdown>
          </div>

        </div>
        <div className="list-view">
          <Table>
            <thead>
              <tr>
                <th>#</th>

              </tr>
            </thead>
          </Table>
        </div>
      </div>
    );
  }
}

export default connect(mapState,actions)(Dashboard);