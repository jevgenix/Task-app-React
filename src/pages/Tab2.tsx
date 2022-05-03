import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
} from "@ionic/react";
// import ExploreContainer from "../components/ExploreContainer";
import "./Tab2.css";

// we need import ion icons from ionicicons/icons
import { star } from "ionicons/icons";

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buttons/icons</IonTitle>
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

export default Tab2;
