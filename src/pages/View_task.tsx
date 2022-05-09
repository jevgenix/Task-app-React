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
    IonCard,
    IonItem,
    IonAvatar,
    IonLabel,
    IonCardContent,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
} from "@ionic/react";
// import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";
import { alertCircleOutline, checkmarkCircleOutline, checkmarkDoneCircleOutline, closeCircleOutline } from "ionicons/icons";

const status_l = [
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
/*
function StatusName(props: any) {
    const e_status = props.status;
    return <p>Current status: {status_l[e_status].name}</p>
}
<StatusName status={task.status} />
*/
const View_task: React.FC = () => {
    const { id } = useParams() as { id: string };
    const [task, setTask] = useState<any>({});
    const { firestore } = useContext(firebase);
    useEffect(() =>
        onSnapshot(doc(firestore, "tasks", id), (doc) => {
            setTask(doc.data())
        }
        ), []);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle class="ion-text-center">{task.task_title}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" fullscreen>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            Due to {new Date(task.last_date).toDateString()}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <h2>Task description:</h2>
                        <p>{task.description}</p>
                    </IonCardContent>
                    <IonCardContent>
                        <p>Sender: {task.sender}</p>
                    </IonCardContent>

                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default View_task;
