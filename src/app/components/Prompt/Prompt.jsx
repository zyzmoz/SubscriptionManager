import React from 'react';
import Octicon, { Check, X } from '@primer/octicons-react';
import {Button} from 'react-bulma-components';

const Prompt = ({confirm, cancel, title, message}) => {
  return (
    <div className="prompt">
      <div className="title">
        {title}
      </div>
      <div className="message">
        {[message]}
      </div>
      <div className="actions">
        <Button 
          onClick={confirm}
          color="success">
          <Octicon icon={Check}/>
          Sim  
        </Button>
        <Button
          onClick={cancel}
          color="danger">
          <Octicon icon={X}/>
          Não  
        </Button>

      </div>
    </div>
  );
};

export default Prompt;