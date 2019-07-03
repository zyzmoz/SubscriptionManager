import Find from 'pouchdb-find';
import PouchDB from 'pouchdb';
PouchDB.plugin(Find);

export const SAVE_CUSTOMER = 'SAVE_CUSTOMER';
export const LIST_CUSTOMERS = 'LIST_CUSTOMERS';

const db = new PouchDB('database.db');

export const saveCustomer = (data) => {
  return async (dispatch) => {
    console.log(data);
    if (!data._id) {
      await db.post({
        ...data,
        collection: 'customers'
      });
    } else {
      await db.put({
        ...data,
        collection: 'customers'
      });
    }
    dispatch({
      type: SAVE_CUSTOMER
    });
  }
}

export const listCustomers = () => {
  return async (dispatch) => {
    const res = await db.find({
      selector: { collection: 'customers' },
      // sort: ['name']
    });

    dispatch({
      type: LIST_CUSTOMERS,
      payload: { list: res.docs }
    });
  }

}