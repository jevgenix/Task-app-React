import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import firebaseContext from '../firebaseConfig'
import { toast } from '../toast'

export const NewTask = () => {
    const [taskTitle, setTaskTitle] = React.useState('')
    const [taskDescription, setTaskDescription] = React.useState('')
    const [taskReceiver, setTaskReceiver] = React.useState('')
    const [taskLastDate, setTaskLastDate] = React.useState('')

    const context = React.useContext(firebaseContext)

    const sendTask = async () => {
        console.log(taskTitle, taskDescription, taskReceiver, taskLastDate)
        const tasksRef  = collection(context.firestore, "tasks")
        const sender    = context.auth.currentUser?.email

        if(!sender) return toast("You must be logged in to send a task")

        await addDoc(tasksRef, {
            description: taskDescription,
            receiver: taskReceiver,
            status: 0,
            task_title: taskTitle,
            last_date: taskLastDate,
            sender
        });
    }

    const clearForm = () => {
        setTaskTitle('')
        setTaskDescription('')
        setTaskReceiver('')
        setTaskLastDate('')
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>New task</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonInput value={taskTitle} onIonChange={e => setTaskTitle(e.detail.value!)} placeholder="title" />
                <IonInput value={taskDescription} onIonChange={e => setTaskDescription(e.detail.value!)} placeholder="description" />
                <IonInput value={taskReceiver} onIonChange={e => setTaskReceiver(e.detail.value!)} placeholder="receiver email" />
                <IonInput value={taskLastDate} onIonChange={e => setTaskLastDate(e.detail.value!)} placeholder="last date"/>
                <IonButton onClick={() => {
                    sendTask().then(() => {
                        clearForm()
                        toast("Task sent")
                    })
                }}>Send</IonButton>
                <IonButton routerLink='/tab3' onClick={clearForm}>Back</IonButton>
                <IonButton onClick={clearForm}>Clear</IonButton>
            </IonContent>
        </IonPage>
    )
}
