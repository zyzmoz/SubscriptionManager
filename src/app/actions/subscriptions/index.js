import Find from 'pouchdb-find';
import PouchDB from 'pouchdb';
PouchDB.plugin(Find);
import moment from 'moment';

export const SAVE_SUB = 'CREATE_SUBS';
export const LIST_SUBS = 'LIST_SUBS';


const db = new PouchDB('database.db');

export const saveSubscription = (data) => {
  return async (dispatch) => {
    console.log(data);
    if (!data._id) {
      await db.post({
        ...data,
        collection: 'subscriptions'
      });
    } else {
      await db.put({
        ...data,
        collection: 'subscriptions'
      });
    }
    dispatch({
      type: SAVE_SUB
    });
  }
}



export const listSubscriptions = () => {
  return async (dispatch) => {
    let res = await db.find({
      selector: { collection: 'subscriptions' },
    });

    const pr = res.docs.map(async (sub, i) => {
      if (moment.duration(moment().diff(moment(sub.ends_at, 'YYYY-MM-DD'))) > 0) {
        await db.put({
          ...sub,
          paid: false
        });        
      }
    });
    await Promise.all(pr);
    res = await db.find({
      selector: { collection: 'subscriptions' },
    });

    dispatch({
      type: LIST_SUBS,
      payload: { list: res.docs }
    });
  }
}

export const deleteSubscription = (data) => {
  return async (dispatch) => {
    const res = await db.remove(data._id, data._rev);
  }
}