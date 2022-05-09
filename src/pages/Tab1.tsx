import React, { useState, useEffect, useContext } from "react";
import "swiper/css";
import "swiper/css/pagination";
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
  IonButton,
} from "@ionic/react";
import {
  checkmarkCircleOutline,
  alertCircleOutline,
  checkmarkDoneCircleOutline,
  closeCircleOutline,
  checkmarkOutline,
  closeOutline,
} from "ionicons/icons";
import "./Tab2.css";

import firebase, { getCurrentUser } from "../firebaseConfig";
import {
  collection,
  where,
  query,
  doc as task,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Task } from "./Tab3";

const status = [
  {
    id: 0,
    icon: alertCircleOutline,
    name: "New task",
    color: "warning",
  },
  {
    id: 1,
    icon: checkmarkCircleOutline,
    name: "On process",
    color: "secondary",
  },
  {
    id: 2,
    icon: checkmarkDoneCircleOutline,
    name: "Finished",
    color: "success",
  },
  {
    id: 3,
    icon: closeCircleOutline,
    name: "Declined",
    color: "danger",
  },
];
function WhichIcon(props: any) {
  const e_status = props.status;
  return (
    <IonAvatar slot="start">
      <IonIcon
        icon={status[e_status].icon}
        size="large"
        color={status[e_status].color}
      />
    </IonAvatar>
  );
}

function StatusName(props: any) {
  const e_status = props.status;
  return <p>Status: {status[e_status].name}</p>;
}

// moi
const Tab1: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { firestore, auth } = useContext(firebase);

  const updateStatus = (id: string, status: number) => {
    writeBatch(firestore)
      .update(task(firestore, "tasks", id), { status })
      .commit()
      .then(() => {
        getTasks();
      });
  };

  const handleLogOutButton = (auth: any) => {
    signOut(auth);
    window.location.href = "/login";
  };

  const getTasks = async () => {
    const tasksRef = collection(firestore, "tasks");
    const user = await getCurrentUser();
    const q = query(
      tasksRef,
      where("receiver", "==", user?.email),
      where("status", "==", 0)
    );

    const querySnapshot = await getDocs(q);

    // Map the snapshot to an array of objects
    const tasks: Task[] = querySnapshot.docs.map((doc) => {
      const task = doc.data() as Task;
      task.id = doc.id;
      return task;
    });

    // Set the tasks state
    setTasks(tasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Home</IonTitle>
          <IonButton onClick={() => handleLogOutButton(auth)} slot={"end"}>
            Log out
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        {tasks.length > 0 ? (
          tasks.map((task, i) => (
            <IonCard key={i}>
              <IonItem>
                <WhichIcon status={task.status} />
                <IonLabel>
                  <h3>{task.task_title}</h3>
                  <p>Description: {task.description}</p>
                  <p>Sender: {task.sender}</p>
                  <StatusName status={task.status} />
                  <p>Due to {new Date(task.last_date).toDateString()}</p>
                </IonLabel>
              </IonItem>
              <IonCardContent>
                <IonButton onClick={() => updateStatus(task.id, 2)}>
                  <IonIcon icon={checkmarkOutline} />
                </IonButton>
                <IonButton onClick={() => updateStatus(task.id, 4)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))
        ) : (
          <IonCard>
            <IonCardContent>
              <h3>No new tasks...</h3>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
