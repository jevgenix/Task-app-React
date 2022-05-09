import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItemOptions,
  IonItem,
  IonCard,
  IonItemOption,
  IonItemSliding,
  IonLabel,
  IonButton,
} from "@ionic/react";
// import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { signOut } from "firebase/auth";
import firebase from "../firebaseConfig";
import { useContext } from "react";
// we will use firebase information later!
const arr = [
  {
    name: "Ray",
    desc: "This guy rocks!",
    img: "imagesourse",
  },
  {
    name: "Leevi",
    desc: "Trust me, I'm programmer",
    img: "imagesourse",
  },
  {
    name: "Evgenii",
    desc: "very handsome ;)",
    img: "imagesourse",
  },
];

// className="ion-padding" on lisätty IonContentiin
const Tab1: React.FC = () => {
  const handleLogOutButton = (auth: any) => {
    signOut(auth);
    window.location.href = "/login";
  };

  const { auth } = useContext(firebase);

  console.log(auth.currentUser);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Loops/cards/events</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <h3>Try to slide any card left or right!</h3>
        <IonCard>
          {arr.map((elem, i) => (
            <IonItemSliding key={elem.name}>
              <IonItem>
                <IonLabel className="ion-padding">
                  <h2>
                    {elem.name} {elem.desc}
                  </h2>
                </IonLabel>
              </IonItem>
              <IonItemOptions side="start">
                <IonItemOption
                  onClick={() => console.log("pressed delete", elem.name)}
                >
                  Delete
                </IonItemOption>
              </IonItemOptions>
              <IonItemOptions side="end">
                <IonItemOption>Add</IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonCard>
        <IonButton onClick={() => handleLogOutButton(auth)}>Log out</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
