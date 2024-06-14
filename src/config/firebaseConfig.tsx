// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4vMmSemRe0PY3mq_QbbtPnFrmfLUnVpg",
    authDomain: "ejercicio-realtimedataba-cc82d.firebaseapp.com",
    projectId: "ejercicio-realtimedataba-cc82d",
    storageBucket: "ejercicio-realtimedataba-cc82d.appspot.com",
    messagingSenderId: "718426955691",
    appId: "1:718426955691:web:f717ba1d3e592a23c0fcee",
    databaseURL:"https://ejercicio-realtimedataba-cc82d-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//constante para obtener servicio de autenticación
export const auth = getAuth(firebase);
// export const auth = initializeAuth(firebase, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// Referencia al servicio de la BDD
export const dbRealTime = getDatabase(firebase);