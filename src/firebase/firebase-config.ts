import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// const firebaseConfig: FirebaseOptions = {
//   apiKey: import.meta.env.VITE_APP_FIREBASE_API,
//   authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASE_URL,
//   projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyDdLY4vGkLUmcbFteOwQvVpjQfWLI_Mnek',
  authDomain: 'videoapp-blog.firebaseapp.com',
  databaseURL: 'https://videoapp-blog-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'videoapp-blog',
  storageBucket: 'videoapp-blog.appspot.com',
  messagingSenderId: '171538162687',
  appId: '1:171538162687:web:0c87bd3f81fa2f47fbfdca',
};

export const firebaseApp = initializeApp(firebaseConfig);

initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('abcdefghijklmnopqrstuvwxy-1234567890abcd'),
  //   isTokenAutoRefreshEnabled: true,
});
export const firebaseAuth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
export const firebaseDb = getFirestore(firebaseApp);
