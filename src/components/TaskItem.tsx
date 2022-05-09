import { IonItem, IonLabel } from '@ionic/react'
import React from 'react'
import { Task, TaskStatus } from '../pages/Tab3'

type Props = {
    task: Task
    [key: string]: any
}

const statusToString = (status: TaskStatus) => {
    switch (status) {
        case TaskStatus.ON_HOLD:
            return 'On hold'
        case TaskStatus.ACCEPTED:
            return 'Accepted'
        case TaskStatus.DECLINED:
            return 'Declined'
        case TaskStatus.FINISHED:
            return 'Finished'
        default:
            return 'Unknown'
    }
}

const TaskItem = ({task}: Props) => {
  return (
    <IonItem>
      <IonLabel>
        <h1>{task.task_title}</h1>
        <p>Description: {task.description}</p>
        <p>Receiver: {task.receiver}</p>
        <p>Status: {statusToString(task.status)}</p>
        <p>Last date: {task.last_date}</p>
      </IonLabel>
    </IonItem>
  )
}

export default TaskItem