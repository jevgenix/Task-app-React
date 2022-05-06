import { useState, useContext } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonLoading,
} from "@ionic/react";
import { Link } from "react-router-dom";
import firebase from "../firebaseConfig";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "../toast";

// routerLink="/tab1"
async function loginUser(username: string, password: string, auth: Auth) {
  const email = `${username}@test.com`;
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
    return true;
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "Firebase: Error (auth/wrong-password).") {
        toast("Wrong password!");
      } else if (err.message === "Firebase: Error (auth/user-not-found).") {
        toast("User not found!");
      } else {
        toast(err.message);
      }
      return false;
    }
  }
}

const Login: React.FC = () => {
  const { auth } = useContext(firebase);
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // loader boolean!
  const [busy, setBusy] = useState<boolean>(false);
  const handleLoginInputChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePwdInputChange = (event: any) => {
    setPassword(event.target.value);
  };

  async function login() {
    setBusy(true);
    const res = await loginUser(email, password, auth);
    if (res) {
      toast("You have logged successfully");
      // REQUIRES TO BE CHANGED!
      window.location.href = "/tab1";
      //
    }
    setBusy(false);
  }

  // remeber to keep dev tools open!!!!
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* Loader */}
      {busy && <IonLoading message="" duration={0} isOpen={busy} />}
      <IonContent className="ion-padding">
        <IonInput
          placeholder="Email"
          value={email}
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
