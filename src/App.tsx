import Menu from "./components/Menu";
import Page from "./pages/Page";
import React from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { ProvideAuth } from "./hooks/use-auth";
import { ProvideApp } from "./hooks/use-app";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Tutorial from "./pages/Tutorial";
import Login from "./pages/Login";

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

const App: React.FC = () => {
  return (
    <ProvideApp>
      <ProvideAuth>
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                {/* <Route path="/page/:name" component={Page} exact /> */}
                {/* <Redirect from="/" to="/page/Inbox" exact /> */}
                <Route path="/" component={Main} exact />
                <Route path="/tutorial" component={Tutorial} exact />
                <Route path="/login" component={Login} exact />

                <Route path="/home" component={Home} exact />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      </ProvideAuth>
    </ProvideApp>
  );
};

export default App;
