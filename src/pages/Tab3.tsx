import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebaseConfig";
import { useParams } from "react-router-dom";
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
} from "@ionic/react";
// import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";

const Tab3: React.FC = () => {
  const { id } = useParams() as { id: string };
  const [task, setTask] = useState<any[]>([]);
  const { firestore } = useContext(firebase);
  console.log({ id });
  console.log("KJh");
  useEffect(() =>
    onSnapshot(collection(firestore, "tasks"), (snapshot) =>
      setTask(snapshot.docs.map((doc) => doc.data()))
    ), []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inputs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput>
        </IonInput>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
