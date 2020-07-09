import React from "react";
import { Redirect } from "react-router";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonIcon,
} from "@ionic/react";
import {
  notifications,
  add,
  card,
  airplane,
  cash,
  receipt,
  people,
} from "ionicons/icons";

interface StateProps {
  isAuthenticated: boolean;
}

const Home: React.FC<StateProps> = ({ isAuthenticated }) => {
  console.log("render here");
  return (
    <IonPage id="tutorial-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon style={{ fontSize: 17 }} icon={notifications} slot="" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding" scroll-y="false">
        <div>Home</div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
