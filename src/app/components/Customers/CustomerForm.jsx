import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Button } from 'react-bulma-components';

const CustomerForm = ({ cancel, save, customer }) => {
  const handleSubmit = (data, {resetForm}) => {
    const { _rev, _id } = customer;
    save({...data, _rev, _id});
    cancel();
    resetForm();
  }
  return (
    <Form onSubmit={handleSubmit} className="form" initialData={customer}>
      <h3>
        Dados do Cliente
      </h3>
      <Input name="name" label="Nome" className="input" />
      <Input name="user" label="Usuário" className="input" />
      <Input name="email" label="Email" className="input" type="email" />
      <Input name="phone" label="Telefone" className="input"  />
      <Input name="address" label="Endereço" className="input" />
      <div className="acoes">
        <Button type="submit" color="success">Salvar</Button>
        <Button onClick={e => cancel(e)} color="danger">Cancelar</Button>
      </div>
    </Form>
  );
};

export default CustomerForm;
