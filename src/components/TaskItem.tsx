import { IonItem } from '@ionic/react'
import React from 'react'
import { Task } from '../pages/Tab3'

type Props = {
    task: Task
    [key: string]: any
}

const TaskItem = ({task}: Props) => {
  return (
    <IonItem>
        <h1>{task.task_title}</h1>
        <p>{task.description}</p>
        <p>{task.receiver}</p>
        <p>{task.status}</p>
        <p>{task.last_date}</p>
        <p>{task.sender}</p>
    </IonItem>
  )
}

export default TaskItem