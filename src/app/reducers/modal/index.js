import { createReducer } from "../createReducer";
import { OPEN_MODAL, CLOSE_MODAL } from "../../actions/modal";

const initialState = {};

const openModal = (state, payload) => {
  return { ...state, visible: payload.visible, component: payload.component }
}

const closeModal = (state, payload) => {
  return { ...state, visible: payload.visible, component: null }
}

export default createReducer(initialState, {
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal
});