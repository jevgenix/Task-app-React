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
  IonGrid,
  IonRow,
  IonSlides,
} from "@ionic/react";
import { checkmarkCircleOutline, alertCircleOutline, checkmarkDoneCircleOutline, closeCircleOutline, chevronForwardOutline, fileTrayStackedSharp } from "ionicons/icons";

import "./Tab2.css";

import { Link } from "react-router-dom";
import firebase from "../firebaseConfig";
import { collection, where, query, onSnapshot } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const linkStyle = {
  textDecoration: "none"
}
//Käyttäjien id:t testejä varten
const uid1 = "hwwVHi8szBVh9zDTfoprFDayyUx2";
const uid2 = "t1acen9hoBcMfwGFncnerJKGW6v2";

const status = [
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
function WhichIcon(props: any) {
  const e_status = props.status;
  return <IonAvatar slot="start"><IonIcon icon={status[e_status - 1].icon} size="large" color={status[e_status - 1].color} /></IonAvatar>
}
function StatusName(props: any) {
  const e_status = props.status;
  return <p>Status: {status[e_status - 1].name}</p>
}
const Tab2: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const { firestore } = useContext(firebase);
  const [f_tasks, setFTasks] = useState<any[]>([]);
  useEffect(() =>
    onSnapshot(query(collection(firestore, "tasks"), where("receiver", "==", uid2)), (snapshot) => {
      setTasks(snapshot.docs.map((doc) => doc.data()));
      setFTasks(snapshot.docs.map((doc) => doc.data()));
    }
    ), [])
  function filtration(i: any) {
    f_tasks.filter(task => task.id === i).map(ftask => {
      console.log(ftask)
    })
  }
  return (
    <div>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle class="ion-text-center">Received Tasks</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" fullscreen>
          <Swiper
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={10}
            grabCursor={true}
            pagination={{
              clickable: true,
            }}

            modules={[Pagination]}
            className="mySwiper"
            onSlideChange={(swiper) => filtration(swiper.activeIndex)}
          >
            <SwiperSlide virtualIndex={0}>All</SwiperSlide>
            <SwiperSlide virtualIndex={1}>New tasks</SwiperSlide>
            <SwiperSlide virtualIndex={2}>On process</SwiperSlide>
            <SwiperSlide virtualIndex={3}>Finished</SwiperSlide>
            <SwiperSlide virtualIndex={4}>Declined</SwiperSlide>
          </Swiper>
          {f_tasks.sort(function (a, b) { return a.status - b.status }).map((doc, i) => (
            <IonCard key={i}>
              <Link to={'/view_task/' + doc.id} style={linkStyle}>
                <IonItem>
                  <WhichIcon status={doc.status} />
                  <IonLabel>
                    <h3>
                      {doc.task_title}
                    </h3>
                    <p>Sender: {doc.sender}</p>
                    <StatusName status={doc.status} />
                  </IonLabel>
                  <IonIcon icon={chevronForwardOutline} size="large" class="ion-text-end" />
                </IonItem>
                <IonCardContent>
                  <IonLabel>
                    Due to {new Date(doc.last_date).toDateString()}
                  </IonLabel>
                </IonCardContent>
              </Link>
            </IonCard>
          ))}
        </IonContent>
      </IonPage>
    </div >
  );
};

export default Tab2;
function contructor() {
  throw new Error("Function not implemented.");
}

