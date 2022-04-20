import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB3naWRjBXcvsPrMIUdaF11DIidaq7mXXk',
  authDomain: 'pr-todolist.firebaseapp.com',
  projectId: 'pr-todolist',
  storageBucket: 'pr-todolist.appspot.com',
  messagingSenderId: '47875314496',
  appId: '1:47875314496:web:615acda83decdece67e0a5',
}

const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp)
