import { initializeApp } from "@firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth, User } from "firebase/auth";

import React from "react";
import { logoFirebase } from "ionicons/icons";

const config = {
  apiKey: "AIzaSyByhWaGLOvIxneeBlFK9uotEUaaLi3DNbk",
  authDomain: "todo-manager-46682.firebaseapp.com",
  databaseURL:
    "https://todo-manager-46682-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-manager-46682",
  storageBucket: "todo-manager-46682.appspot.com",
  messagingSenderId: "623826590924",
  appId: "1:623826590924:web:0ddd68548c8cebaef83669",
};

const app = initializeApp(config);

export function getCurrentUser(): Promise<User> {
  return new Promise((resolve, reject) => {
    getAuth().onAuthStateChanged(
      (user) => {
        if (user) {
          resolve(user);
        } else {
          reject("No user logged in");
        }
      }, 
      (error) => {
        reject(error);
      });
  });
}

export const context = {
  app,
  db: getDatabase(app),
  firestore: getFirestore(app),
  auth: getAuth(app),
};

const firebaseContext = React.createContext(context);

export default firebaseContext;
