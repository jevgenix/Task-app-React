import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
} from "@ionic/react";

import { register } from "../serviceWorkerRegistration";
import { Link } from "react-router-dom";

// routerLink="/tab1"

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  function register() {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    let bool = regEx.test(email); // true tai false, riippuu emailista!
    if (bool === false) {
      setEmail("");
      return alert("Invalid email!");
    }

    if (password != confirmPassword) {
      // if passwords doesnt match, bool equals false
      bool = false;
    }

    if (bool) {
      console.log(
        "registered data:",
        username,
        email,
        password,
        confirmPassword
      );
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      alert("Password mismatch!");

      setPassword("");
      setConfirmPassword("");
    }
  }

  // remeber to keep dev tools open!!!!
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          placeholder="username"
          value={username}
          onIonChange={handleUsernameChange}
        ></IonInput>

        <IonInput
          placeholder="email"
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={email}
          onIonChange={handleEmailChange}
        ></IonInput>

        <IonInput
          placeholder="password"
          type="password"
          value={password}
          onIonChange={handlePasswordChange}
        ></IonInput>
        <IonInput
          placeholder="confirm password"
          type="password"
          value={confirmPassword}
          onIonChange={handleConfirmPasswordChange}
        ></IonInput>

        <IonButton expand="full" onClick={register}>
          Register
        </IonButton>
        <p>
          <Link to="/login">Back to login</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
