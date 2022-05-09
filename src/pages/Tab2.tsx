import React, { useState, useEffect, useContext } from "react";
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
  IonIcon,
} from "@ionic/react";
import { checkmarkCircleOutline, alertCircleOutline, checkmarkDoneCircleOutline, closeCircleOutline, chevronForwardOutline } from "ionicons/icons";

import "./Tab2.css";

import { Link } from "react-router-dom";
import firebase from "../firebaseConfig";
import { collection, where, query, onSnapshot, getDocs } from 'firebase/firestore';
import { Task } from "./Tab3";

const linkStyle = {
  textDecoration: "none"
}

const status = [
  {
    id: 1,
    icon: alertCircleOutline,
    name: "New task",
    color: "warning"
  },
  {
    id: 2,
    icon: checkmarkCircleOutline,
    name: "On process",
    color: "secondary"
  },
  {
    id: 3,
    icon: checkmarkDoneCircleOutline,
    name: "Finished",
    color: "success"
  },
  {
    id: 4,
    icon: closeCircleOutline,
    name: "Declined",
    color: "danger"
  }
]
function WhichIcon(props: { status: number }) {
  const e_status = props.status;
  return <IonAvatar slot="start"><IonIcon icon={status[e_status - 1].icon} size="large" color={status[e_status - 1].color} /></IonAvatar>
}
function StatusName(props: { status: number }) {
  const e_status = props.status;
  return <p>Status: {status[e_status - 1].name}</p>
}

  
const Tab2: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { firestore, auth } = useContext(firebase);

  const getTasks = async () => {
    const tasksRef = collection(firestore, "tasks");
    const q = query(tasksRef, where("receiver", "==", auth.currentUser?.email));
    
    const querySnapshot = await getDocs(q);

    // Map the snapshot to an array of objects
    const tasks: Task[] = querySnapshot.docs.map((doc) => {
      const task = doc.data() as Task;
      task.id = doc.id;
      return task;
    })

    // Set the tasks state
    setTasks(tasks);
  }

  useEffect(() =>{
    getTasks()
  },[])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Received Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        {tasks.length > 0 ? tasks.sort(function (a, b) { return a.status - b.status }).map((doc, i) => (
          <IonCard key={i}>
            <Link to={'/view_task/' + doc.id} style={linkStyle}>
              <IonItem>
                <IonLabel>
                  <h3>
                    {doc.task_title}
                  </h3>
                  <p>Sender: {doc.sender}</p>
                </IonLabel>
                <IonIcon icon={chevronForwardOutline} size="large" class="ion-text-end" />
              </IonItem>
              <IonCardContent>
                <IonLabel>
                  Due to {new Date(doc.last_date).toDateString()}
                </IonLabel>
              </IonCardContent>
            </Link>
          </IonCard>
        )): <p>No tasks</p>}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;


