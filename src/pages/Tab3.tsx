<<<<<<< HEAD
import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebaseConfig";
import { useParams } from "react-router-dom";
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
=======
import { useContext, useEffect, useState } from "react";

>>>>>>> main
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonList,
  IonGrid,
  IonRow,
  IonButton,
  IonCol,
  IonItem,
  IonLabel,
} from "@ionic/react";
// import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";
import firebaseContext from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import TaskItem from "../components/TaskItem";

export enum TaskStatus {
  ON_HOLD,
  ACCEPTED,
  DECLINED,
  FINISHED
}

export type Task = {
    description: string;
    receiver: string;
    status: TaskStatus;
    task_title: string;
    id: string;
    last_date: string;
    sender: string
}


// Your Tasks
const Tab3: React.FC = () => {
<<<<<<< HEAD
  const { id } = useParams() as { id: string };
  const [task, setTask] = useState<any[]>([]);
  const { firestore } = useContext(firebase);
  console.log({ id });
  console.log("KJh");
  useEffect(() =>
    onSnapshot(collection(firestore, "tasks"), (snapshot) =>
      setTask(snapshot.docs.map((doc) => doc.data()))
    ), []);
=======
  const { auth, firestore } = useContext(firebaseContext);
  const [taskStatus, setTaskStatus] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const user = auth.currentUser;

  const getSentTasks = async () => {
    // Construct query
    const tasksRef = collection(firestore, "tasks");
    const q = query(tasksRef, where("sender", "==", user?.email));
    
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

  // Get the tasks when the component is mounted
  useEffect(() => {
    getSentTasks();
    setFilteredTasks(getFilteredTasks());
  }, [taskStatus]);

  // Filter the tasks by status
  const getFilteredTasks = (): Task[] => {
    return tasks.filter((task) => {
      if (task.status === taskStatus) {
        return task;
      }
    });
  }

  // Set the filtered tasks state
  const handleTaskStatus = (status: TaskStatus) => {
    setTaskStatus(status);             
  }

>>>>>>> main
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your sent tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
<<<<<<< HEAD
        <IonInput>
        </IonInput>
=======
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton onClick={() => handleTaskStatus(TaskStatus.ON_HOLD)}>On hold</IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={() => handleTaskStatus(TaskStatus.ACCEPTED)}>Accepted</IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={() => handleTaskStatus(TaskStatus.DECLINED)}>Declined</IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={() => handleTaskStatus(TaskStatus.FINISHED)}>Finished</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonList>
          {
            // Map the tasks to a list of TaskItem components
          filteredTasks.map((task) => {
            return (
              <TaskItem key={task.id} task={task} />
            );
          })} 
          <IonItem>
            <IonButton routerLink="/newtask">New task</IonButton>
          </IonItem>
        </IonList>
>>>>>>> main
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
