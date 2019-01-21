import { firestore } from '../firebase';

export const removeItem = async (collection, id) => {
  firestore.doc(`${collection}/${id}`).delete();
};

export const addItem = async (collection) => {
  firestore.collection(collection).add({ reatedAt: new Date() });
};
