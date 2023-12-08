import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: 'AIzaSyDSU8cfdDA5_bQqFQ3pv3_nN1hKpT1Y5sc',
    authDomain: 'ecommerce-nextjs-d5449.firebaseapp.com',
    projectId: 'ecommerce-nextjs-d5449',
    storageBucket: 'ecommerce-nextjs-d5449.appspot.com',
    messagingSenderId: '402870140598',
    appId: '1:402870140598:web:391e5960d16abd035b7017',
    measurementId: 'G-46MQSTS0SB',
};

export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
