import React, { Component, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Button } from 'react-bulma-components';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux';
import { listCustomers } from '../../actions/customers';

const mapState = (state) => ({
  customers: state.customers.list
});

const actions = {
  listCustomers
}
class SubscriptionForm extends Component {
  state = {
    value: '',
    id: null
  }

  async componentDidMount() {
    await this.props.listCustomers();
  }

  render() {
    const { customers } = this.props;
    const { value } = this.state;
    console.log(customers)
    return (

      <div>


        {customers && <Autocomplete
          className="autocomplete"
          getItemValue={(item) => item.name}
          items={customers}
          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {item.name}
            </div>
          }
          value={value}
          onChange={(e) => this.setState({ value: e.target.value })}
          onSelect={(val) => this.setState({ id: val })}
        />}
      </div>
       
      
    );
  }
}


export default connect(mapState, actions)(SubscriptionForm);