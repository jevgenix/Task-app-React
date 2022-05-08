import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonCard,
  IonLabel,
  IonAvatar,
  IonIcon,
  IonCardContent,
} from "@ionic/react";
import { ellipse, star } from "ionicons/icons";
// import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
// we will use firebase information later!

// className="ion-padding" on lisätty IonContentiin
const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton color="primary" onClick={() => console.log("clicked!")}>
          Button check
        </IonButton>
        <IonButton
          expand="full"
          color="primary"
          onClick={() => console.log("clicked!")}
        >
          {/* use icon={icon name you want to import!} */}
          <IonIcon slot="start" icon={star}></IonIcon>
          Expanded Button check
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
