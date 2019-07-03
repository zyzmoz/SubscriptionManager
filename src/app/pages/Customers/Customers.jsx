import React, { Component } from 'react';
import { Button, Table, Dropdown } from 'react-bulma-components';
import Octicon, { Pencil, Trashcan, Plus } from '@primer/octicons-react';
import CustomerForm from '../../components/Customers/CustomerForm';
import { connect } from 'react-redux';
import { saveCustomer, listCustomers } from '../../actions/customers';
import { openModal, closeModal } from '../../actions/modal';

const mapState = (state) => ({
  customers: state.customers.list
});

const actions = {
  closeModal,
  openModal,
  saveCustomer,
  listCustomers
}


class Customers extends Component {
  cancel = () => {    
    this.props.closeModal();
  }

  save = async (data) => {
    await this.props.saveCustomer(data);
    await this.props.listCustomers();    
  }

  componentDidMount() {
    this.props.listCustomers();
  }

  render() {    
    const { customers } = this.props;
    return (
      <div className="dashboard">
        <div className="header">
          <div className="title">
            Clientes
          </div>
          <div className="actions wrapper">
            <Button
              onClick={() => this.props.openModal(<CustomerForm cancel={this.cancel} save={this.save} />)}
              color="success">
              <Octicon icon={Plus}/>
              Novo
          </Button>
            {/* <Dropdown value="1">
              <Dropdown.Item value="1">Todos</Dropdown.Item>
              <Dropdown.Item value="2">Recebidos</Dropdown.Item>
              <Dropdown.Item value="3">A Receber</Dropdown.Item>
            </Dropdown> */}
          </div>

        </div>
        <div className="list-view">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Usuário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {customers && customers.map((customer, i) =>
                <tr key={i}>
                  <th>{i}</th>
                  <th>{customer.name}</th>
                  <th>{customer.user}</th>
                  <th className="acoes">
                    <Button 
                      onClick={() => this.props.openModal(<CustomerForm cancel={this.cancel} save={this.save} customer={customer} />)}
                      color="primary">
                      <Octicon icon={Pencil} />
                    </Button>                    
                    <Button color="danger">
                      <Octicon icon={Trashcan} />
                    </Button>
                  </th>
                </tr>
              )
              }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
export default connect(mapState, actions)(Customers);