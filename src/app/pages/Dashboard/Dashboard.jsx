import React, { Component } from 'react';
import { Button, Table, Dropdown } from 'react-bulma-components';
import Octicon, { Sync, Trashcan } from '@primer/octicons-react';
import { openModal, closeModal } from '../../actions/modal';
import { connect } from 'react-redux';
import SubscriptionForm from '../../components/Subscription/SubscriptionForm';
import { listSubscriptions, saveSubscription, deleteSubscription } from '../../actions/subscriptions';
import moment from 'moment';
import Prompt from '../../components/Prompt/Prompt';

const mapState = (state) => ({
  subs: state.subscriptions.list
});

const actions = {
  openModal,
  closeModal,
  listSubscriptions,
  saveSubscription,
  deleteSubscription
}

class Dashboard extends Component {
  async componentDidMount() {
    await this.props.listSubscriptions();  
  }

  renewSub = async (data) => {
    const newExpiration = moment().add('days', 30);
    const updSub = { ...data, ends_at: moment(newExpiration).format('YYYY-MM-DD'), paid: true };
    await this.props.saveSubscription(updSub);
    await this.props.listSubscriptions();
  }

  delete = (data) => { 
    const confirm = async() => {
      await this.props.deleteSubscription(data);
      await this.props.closeModal();
      await this.props.listSubscriptions();
    }
    this.props.openModal(
      <Prompt 
        title="Aviso" 
        message={["Deseja excluir a assinatura do usuário: ", <b>{data.user}</b>, "?"]}
        cancel={this.props.closeModal}
        confirm={confirm}
      />
    );       
  }


  render() {
    const { subs } = this.props;
    console.log(this.props)
    return (
      <div className="dashboard">
        <div className="header">
          <div className="title">
            Assinaturas
          </div>
          <div className="actions wrapper">
            <Button onClick={() => this.props.openModal(<SubscriptionForm listSubscriptions={this.props.listSubscriptions} />)} color="success">Novo Registro</Button>
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
                <th>Usuário</th>
                <th>Início</th>
                <th>Término</th>
                <th>Pago</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                subs && subs.map((sub, i) =>
                  <tr key={i}>
                    <th>{i}</th>
                    <th>{sub.user}</th>
                    <th>{moment(sub.begins_at, 'YYYY-MM-DD').format('DD/MM/YYYY')}</th>
                    <th>{moment(sub.ends_at, 'YYYY-MM-DD').format('DD/MM/YYYY')}</th>
                    <th>
                      <input type="checkbox" disabled={true} checked={sub.paid} />
                    </th>
                    <th className="acoes">
                      <Button disabled={ moment.duration(moment().diff(moment(sub.ends_at, 'YYYY-MM-DD'))) < 0} onClick={() => this.renewSub(sub)} >
                        <Octicon icon={Sync} />
                      </Button>                      
                      <Button
                        onClick={() => this.delete(sub)}
                        color="danger">
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

export default connect(mapState, actions)(Dashboard);