import { Redirect, Route } from "react-router-dom";
<<<<<<< HEAD
import "swiper/css/bundle";
=======
import { useEffect, useState } from "react";
>>>>>>> main
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonSpinner,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Login from "./pages/Login";
import Register from "./pages/Register";
import View_task from "./pages/View_task";

import FirebaseContext from "./firebaseConfig";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useContext } from "react";

import { getCurrentUser } from "./firebaseConfig";
import { NewTask } from "./pages/NewTask";

setupIonicReact();

const RoutingSystem: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route render={() => <Tab1 />} exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

const RoutingSystemWithTabs: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>

          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1 />
            </Route>

            <Route exact path="/tab2">
              <Tab2 />
            </Route>

            <Route exact path="/tab3">
              <Tab3 />
            </Route>

            <Route exact path="/newtask">
              <NewTask />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>
            <Route path="/view_task/:id">
              <View_task />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonLabel>Received Tasks</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonLabel>Your Tasks</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

const App: React.FC = () => {
  const [busy, setBusy] = useState(true);
  const firebaseApp = useContext(FirebaseContext);
  useEffect(() => {
    getCurrentUser().then((user) => {
      // regular login
      if (user) {
        window.history.replaceState({}, "", "/tab1");
      } else {
        window.history.replaceState({}, "", "/login");
        setBusy(false);
      }
    });
  }, []);

  console.log(firebaseApp);
  return (
    <IonApp>{busy ? <RoutingSystemWithTabs /> : <RoutingSystem />}</IonApp>
  );
};

export default App;
