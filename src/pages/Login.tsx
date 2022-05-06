import { useState, useContext } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
} from "@ionic/react";
import { Link } from "react-router-dom";
import firebase from "../firebaseConfig";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
// routerLink="/tab1"

async function loginUser(username: string, password: string, auth: Auth) {
  const email = `${username}@test.com`;
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

const Login: React.FC = () => {
  const { auth } = useContext(firebase);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginInputChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePwdInputChange = (event: any) => {
    setPassword(event.target.value);
  };

  async function login() {
    const res = await loginUser(username, password, auth);
    alert(`${res ? "Login success" : "Login failed"}`);
  }

  // remeber to keep dev tools open!!!!
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          placeholder="Username"
          value={username}
          onIonChange={handleLoginInputChange}
        ></IonInput>
        <IonInput
          placeholder="Password"
          type="password"
          value={password}
          onIonChange={handlePwdInputChange}
        ></IonInput>

        <IonButton expand="full" onClick={login}>
          Login
        </IonButton>

        <p>
          <Link to="/register">Wanna make account?</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
