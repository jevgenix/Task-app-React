import { useContext, useEffect, useState } from "react";

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
} from "@ionic/react";
// import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";
import firebaseContext, { getCurrentUser } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

enum TaskStatus {
  ON_HOLD,
  ACCEPTED,
  DECLINED,
  FINISHED
}

type Task = {
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
  const {auth, firestore} = useContext(firebaseContext);
  const [taskStatus, setTaskStatus] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const user = auth.currentUser;
  console.log(user)

  const getReceivedTasks = async () => {
    // Construct query
    const tasksRef = collection(firestore, "tasks");
    const q = query(tasksRef, where("receiver", "==", user?.uid));
    
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

  useEffect(() => {
    getReceivedTasks();
  }, [getReceivedTasks])

  const getFilteredTasks = (): Task[] => {
    return tasks.filter((task) => {
      if (task.status === taskStatus) {
        return task;
      }
    });
  }
  

  const handleTaskStatus = (status: TaskStatus) => {
    setTaskStatus(status);
    setFilteredTasks(getFilteredTasks());
  }

  // remeber to keep dev tools open!!!!
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
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
          {filteredTasks.map((task) => {
            return (
              <IonItem key={task.id}>
                <h3>{task.task_title}</h3>
                <p>{task.description}</p>
                <p>{task.last_date}</p>
                <p>{task.sender}</p>
              </IonItem>
            );
          })} 
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
