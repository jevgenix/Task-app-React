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
} from "@ionic/react";
// import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";

// className="ion-padding" on lisätty IonContentiin
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
                    <IonTitle>{task.task_title}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" fullscreen>
                <IonCard>
                    <IonItem>
                        <IonAvatar slot="start">
                            <img src="" />
                        </IonAvatar>
                        <IonLabel>
                            <h3>
                                Title
                            </h3>
                            <p>Sender: </p>
                            <p>Status: </p>
                        </IonLabel>
                    </IonItem>
                    <IonCardContent>
                        <IonLabel>
                            Due to
                        </IonLabel>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default View_task;
