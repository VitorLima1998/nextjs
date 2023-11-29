// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDSU8cfdDA5_bQqFQ3pv3_nN1hKpT1Y5sc',
    authDomain: 'ecommerce-nextjs-d5449.firebaseapp.com',
    projectId: 'ecommerce-nextjs-d5449',
    storageBucket: 'ecommerce-nextjs-d5449.appspot.com',
    messagingSenderId: '402870140598',
    appId: '1:402870140598:web:391e5960d16abd035b7017',
    measurementId: 'G-46MQSTS0SB',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
