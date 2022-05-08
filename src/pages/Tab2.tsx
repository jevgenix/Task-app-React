import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonItem,
  IonAvatar,
  IonLabel,
  IonCardContent,
  IonButton,
  IonIcon,
} from "@ionic/react";
// import ExploreContainer from "../components/ExploreContainer";
import "./Tab2.css";

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebaseConfig";
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const linkStyle = {
  textDecoration: "none"
}

const tasks_i = [
  {
    id: "123",
    sender: "string",
    receiver: "string",
    task_title: "string",
    description: "string",
    last_date: "string",
    status: "string"
  },
  {
    id: "123",
    sender: "string",
    receiver: "string",
    task_title: "string",
    description: "string",
    last_date: "string",
    status: "string"
  }
]

const Tab2: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const { firestore } = useContext(firebase);
  useEffect(() =>
    onSnapshot(collection(firestore, "tasks"), (snapshot) =>
      setTasks(snapshot.docs.map((doc) => doc.data()))
    ), []);
  return (
    <div>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Received Tasks</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" fullscreen>
          {tasks.map((doc, i) => (
            <IonCard key={i}>
              <Link to={'/view_task/' + doc.id} style={linkStyle}>
                <IonItem>
                  <IonAvatar slot="start">
                    <img src="" />
                  </IonAvatar>
                  <IonLabel>
                    <h3>
                      {doc.task_title}
                    </h3>
                    <p>Sender: {doc.sender}</p>
                    <p>Status: {doc.status}</p>
                  </IonLabel>
                </IonItem>
                <IonCardContent>
                  <IonLabel>
                    Due to {doc.last_date}
                  </IonLabel>
                </IonCardContent>
              </Link>
            </IonCard>
          ))}
        </IonContent>
      </IonPage>
    </div >
  );
};

export default Tab2;
