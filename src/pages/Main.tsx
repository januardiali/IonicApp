import React from "react";
import { Redirect } from "react-router";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonPage,
  IonImg,
  IonSpinner,
  IonContent,
} from "@ionic/react";

import { useAuth } from "../hooks/use-auth";
import { useApp } from "../hooks/use-app";

import "./Main.scss";

const Main: React.FC = () => {
  const app = useApp();
  const auth = useAuth();

  return app.loading || auth.loading ? (
    <IonPage id="splash-screen-page">
      <IonContent fullscreen>
        <div className="vertical-center">
          <IonImg
            className="sambatan-logo"
            src="/assets/icon/icon.png"
            alt="logo-sambatan"
          />
        </div>
      </IonContent>
    </IonPage>
  ) : app.hasSeenTutorial ? (
    auth.user !== null ? (
      <Redirect to="/home" />
    ) : (
      <Redirect to="/login" />
    )
  ) : (
    <Redirect to="/tutorial" />
  );
};

export default Main;
