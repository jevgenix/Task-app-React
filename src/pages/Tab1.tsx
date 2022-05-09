import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
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
  chevronForwardOutline,
  checkmarkOutline,
  closeOutline,
} from "ionicons/icons";

import "./Tab2.css";

import { Link } from "react-router-dom";
import firebase from "../firebaseConfig";
import {
  collection,
  where,
  query,
  onSnapshot,
  doc,
  writeBatch,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

const linkStyle = {
  textDecoration: "none",
};
//Käyttäjien id:t testejä varten
const uid1 = "hwwVHi8szBVh9zDTfoprFDayyUx2";
const uid2 = "t1acen9hoBcMfwGFncnerJKGW6v2";

const status = [
  {
    id: 1,
    icon: alertCircleOutline,
    name: "New task",
    color: "warning",
  },
  {
    id: 2,
    icon: checkmarkCircleOutline,
    name: "On process",
    color: "secondary",
  },
  {
    id: 3,
    icon: checkmarkDoneCircleOutline,
    name: "Finished",
    color: "success",
  },
  {
    id: 4,
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
        icon={status[e_status - 1].icon}
        size="large"
        color={status[e_status - 1].color}
      />
    </IonAvatar>
  );
}
function StatusName(props: any) {
  const e_status = props.status;
  return <p>Status: {status[e_status - 1].name}</p>;
}
const Tab1: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const { firestore } = useContext(firebase);
  const { auth } = useContext(firebase);

  useEffect(
    () =>
      onSnapshot(
        query(collection(firestore, "tasks"), where("receiver", "==", uid2)),
        (snapshot) => {
          setTasks(snapshot.docs.map((doc) => doc.data()));
        }
      ),
    []
  );

  const handleLogOutButton = (auth: any) => {
    console.log("aaa");
    signOut(auth);
    window.location.href = "/login";
  };

  return (
    <div>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle class="ion-text-center">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" fullscreen>
          {tasks
            .filter((task) => task.status == 1)
            .map((doc, i) => (
              <IonCard key={i}>
                <IonItem>
                  <WhichIcon status={doc.status} />
                  <IonLabel>
                    <h3>{doc.task_title}</h3>
                    <p>Sender: {doc.sender}</p>
                    <StatusName status={doc.status} />
                    <p>Due to {new Date(doc.last_date).toDateString()}</p>
                  </IonLabel>
                  <IonIcon
                    icon={chevronForwardOutline}
                    size="large"
                    class="ion-text-end"
                  />
                </IonItem>
                <IonCardContent>
                  <IonButton
                    onClick={() => {
                      writeBatch(firestore).update(
                        doc(firestore, "tasks", doc.id),
                        { status: 2 }
                      );
                    }}
                  >
                    <IonIcon icon={checkmarkOutline} />
                  </IonButton>
                  <IonButton
                    onClick={() =>
                      doc(firestore, "tasks", doc.id).update({ status: 4 })
                    }
                  >
                    <IonIcon icon={closeOutline} />
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}

          <IonButton onClick={() => handleLogOutButton(auth)}>
            {" "}
            Log out{" "}
          </IonButton>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Tab1;
