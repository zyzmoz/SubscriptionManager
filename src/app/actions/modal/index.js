export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (component) => {
  return {
    type: OPEN_MODAL,
    payload: { visible: true, component }
  }
}

export const closeModal = () => {
  return {
    type: OPEN_MODAL,
    payload: { visible: false }
  }
}