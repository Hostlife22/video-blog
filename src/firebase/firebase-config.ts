import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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

export const firebaseAuth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
export const firebaseDb = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
