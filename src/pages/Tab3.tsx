import { useState } from "react";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
} from "@ionic/react";
// import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";

const Tab3: React.FC = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (e: any) => {
    console.log(e.target.value);
  };

  // remeber to keep dev tools open!!!!
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inputs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          placeholder="click me"
          value={input}
          onIonChange={handleInputChange}
        ></IonInput>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
