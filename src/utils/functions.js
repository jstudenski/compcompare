import { firestore } from '../firebase';

export const collectIdsAndDocs = doc => ({ id: doc.id, ...doc.data() });

export const removeItem = async (collection, id) => {
  firestore.doc(`${collection}/${id}`).delete();
};

export const addItem = async (collection) => {
  firestore.collection(collection).orderBy('displayOrder', 'desc').limit(1).get()
    .then(snap => snap.docs.map(collectIdsAndDocs)[0].displayOrder)
    .then((displayOrder) => {
      firestore.collection(collection).add({
        createdAt: new Date(),
        displayOrder: displayOrder + 1,
      });
    });
};
  // const ref = firestore.collection(collection);
  // const query = ref.orderBy('displayOrder', 'desc').limit(1);
  // const temp = ref.orderBy('displayOrder').limit(3);
  // console.log(temp);

// const docRef = firestore.collection(collection); // .doc('Rm9cME0VKojzfuNLpYrq');

// docRef.get().then((doc) => {
//   if (doc.exists) {
//     console.log('Document data:', doc.data());
//   } else {
//     // doc.data() will be undefined in this case
//     console.log('No such document!');
//   }
// }).catch((error) => {
//   console.log('Error getting document:', error);
// });
