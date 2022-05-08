import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import firebaseContext from '../firebaseConfig'

export const NewTask = () => {
    const [taskTitle, setTaskTitle] = React.useState('')
    const [taskDescription, setTaskDescription] = React.useState('')
    const [taskReceiver, setTaskReceiver] = React.useState('')
    const [taskStatus, setTaskStatus] = React.useState('')
    const [taskLastDate, setTaskLastDate] = React.useState('')
    const [taskSender, setTaskSender] = React.useState('')

    const firebase = React.useContext(firebaseContext)

    const sendTask = async () => {
        console.log(taskTitle, taskDescription, taskReceiver, taskStatus, taskLastDate, taskSender)
        const tasksRef = collection(firebase.firestore, "tasks")

        await addDoc(tasksRef, {
            description: taskDescription,
            receiver: taskReceiver,
            status: 0,
            task_title: taskTitle,
            last_date: taskLastDate,
            sender: firebase.auth.currentUser?.uid
        });
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>New task</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonInput onIonChange={e => setTaskTitle(e.detail.value!)} placeholder="title" />
                <IonInput onIonChange={e => setTaskDescription(e.detail.value!)} placeholder="description" />
                <IonInput onIonChange={e => setTaskReceiver(e.detail.value!)} placeholder="receiver" />
                <IonInput onIonChange={e => setTaskLastDate(e.detail.value!)} placeholder="last date" />
                <IonButton onClick={() => {
                    sendTask()
                }}>Send</IonButton>
            </IonContent>
        </IonPage>
    )
}
