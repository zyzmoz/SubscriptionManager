import React, { Component, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Button } from 'react-bulma-components';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux';
import { listCustomers } from '../../actions/customers';
import { closeModal } from '../../actions/modal';
import { saveSubscription } from '../../actions/subscriptions';

const mapState = (state) => ({
  customers: state.customers.list
});

const actions = {
  listCustomers,
  closeModal,
  saveSubscription
}

class SubscriptionForm extends Component {
  state = {
    value: '',
    id: null,
    paid: true,
    customers: null
  }

  async componentDidMount() {
    await this.props.listCustomers();
    this.setState({ customers: this.props.customers });
  }

  filterCustomer = (str) => {
    const { customers } = this.props;
    const name = '';    
    let filtered;
    if (str.length > 0) {
      filtered = customers.filter(customer => customer.name.toUpperCase().includes(str.toUpperCase()));
    } else {
      filtered = customers;
    }
    this.setState({ value: str, customers: filtered });
  }

  handleSubmit = async(data, { resetForm }) => {
    const { value, id, paid } = this.state;
    let newSubscription = { ...data, paid, customer_id: id, customer_name: value };
    console.log(newSubscription);
    await this.props.saveSubscription(newSubscription);
    await this.props.listSubscriptions();
    this.props.closeModal()
    resetForm();
  }

  render() {
    const { value, paid, id, customers } = this.state;
    console.log(this.state)
    return (
      <div>
        <Form className="form" onSubmit={this.handleSubmit} >
          <h3>
            Dados Assinatura
          </h3>
          <label>Cliente</label>
          {customers && <Autocomplete
            wrapperStyle={{
              width: '100%'
            }}

            menuStyle={
              {
                borderRadius: '3px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '2px 0',
                fontSize: '90%',
                position: 'fixed',
                overflow: 'auto',
                maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom         
                border: '1px solid #1e72df',
                zIndex: '99'
              }
            }

            getItemValue={(item) => item.name}
            items={customers}
            renderItem={(item, isHighlighted) =>
              <div className="auto-items" key={item._id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.name}
              </div>
            }
            value={value}
            onChange={(e) => this.filterCustomer(e.target.value)}
            onSelect={(val, item) => this.setState({ value: val, id: item._id })}
            inputProps={{
              className: 'input'
            }}

          />}
          <Input name="user" label="Usuário" className="input" required />
          <Input name="begins_at" label="Início" className="input" type="date" required />
          <Input name="ends_at" label="Témino" className="input" type="date" required />

          <div className="checkbox">
            <label >Pago?</label>
            <input type="checkbox" checked={paid} onClick={() => this.setState({ paid: !paid })} />
          </div>

          <div className="acoes" >
            <Button type="submit" disabled={!id} color="success">Salvar</Button>
            <Button onClick={e => this.props.closeModal()} color="danger">Cancelar</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(mapState, actions)(SubscriptionForm);