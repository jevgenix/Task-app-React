import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItemOptions,
  IonItem,
  IonText,
  IonCard,
  IonItemOption,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
// import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";

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
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
