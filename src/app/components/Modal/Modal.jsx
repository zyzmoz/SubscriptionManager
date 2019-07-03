import React from 'react';
import { connect } from 'react-redux';

const mapState = (state) => ({
  modal: state.modal
});

const Modal = (props) => {
  console.log('modal', props);
  return (
    <div>
      {
        props.modal.visible &&
        <div className="modal-view">
          <div className="content">
            {props.modal.component}
            {/* <props.modal.component /> */}
          </div>
        </div>
      }
    </div>

  );
};

export default connect(mapState)(Modal);