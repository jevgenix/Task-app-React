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
import {
  Auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
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

async function loginWithGoogle(auth: Auth) {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //const credential = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
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
        <IonButton onClick={() => loginWithGoogle(auth)}>
          Login with Google
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
