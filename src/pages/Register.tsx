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
  IonItem,
} from "@ionic/react";

import firebase from "../firebaseConfig";
import { Link } from "react-router-dom";
import { toast } from "../toast";
import { createUserWithEmailAndPassword, Auth } from "firebase/auth";

// routerLink="/tab1"

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const { auth } = useContext(firebase);
  // loader boolean!
  const [busy, setBusy] = useState<boolean>(false);

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  async function registerUser(email: string, password: string, auth: Auth) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      toast("You have registrated successfully, welcome aboard!");

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      return true;
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "Firebase: Error (auth/email-already-in-use).") {
          toast("Email is already in use");
          setEmail("");
        } else if (
          err.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          toast("Weak password, should be at least 6 characters.");
          setPassword("");
          setConfirmPassword("");
        } else {
          toast(err.message);
        }
      }
      return false;
    }
  }

  async function register() {
    setBusy(true);
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    let bool = regEx.test(email); // true tai false, riippuu emailista!

    if (bool === false) {
      setBusy(false);
      setEmail("");
      return toast("Invalid email!");
    }

    if (username.trim() === "" || password.trim() === "") {
      setBusy(false);
      return toast("Username and password are required");
    }
    if (password !== confirmPassword) {
      // if passwords doesnt match, bool equals false
      setBusy(false);
      setPassword("");
      setConfirmPassword("");
      return toast("Password mismatch");
    }

    const res = await registerUser(email, password, auth);
    if (!res) {
      setBusy(false);
    } else {
      setBusy(false);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* Loader */}
      {busy && <IonLoading message="" duration={0} isOpen={busy} />}
      <IonContent className="ion-padding">
        <div className="form">
          <IonItem className="form-field">
            <IonInput
              className="input"
              placeholder="Email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              value={email}
              onIonChange={handleEmailChange}
            ></IonInput>
          </IonItem>

          <IonItem className="form-field">
            <IonInput
              className="input"
              placeholder="Password"
              type="password"
              value={password}
              onIonChange={handlePasswordChange}
            ></IonInput>
          </IonItem>

          <IonItem className="form-field">
            <IonInput
              className="input"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onIonChange={handleConfirmPasswordChange}
            ></IonInput>
          </IonItem>

          <button className="connect" onClick={register}>
            Register
          </button>
          <p className="makeNewAcc">
            <Link to="/login">Back to login</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
