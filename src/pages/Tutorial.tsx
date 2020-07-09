import React, {
  useState,
  useRef,
  useReducer,
  useEffect,
  useContext,
} from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonSlides,
  IonSlide,
  IonIcon,
  useIonViewWillEnter,
} from "@ionic/react";
import { arrowForward } from "ionicons/icons";
// import { setMenuEnabled } from "../data/sessions/sessions.actions";
// import { setHasSeenTutorial } from "../data/user/user.actions";
import "./Tutorial.scss";
import { RouteComponentProps } from "react-router-dom";
import { Plugins } from "@capacitor/core";
import { useApp } from "../hooks/use-app";

const { Storage } = Plugins;

type Item = {
  src: string;
  text: string;
};
const items: Item[] = [
  { src: "http://placekitten.com/g/200/300", text: "a picture of a cat" },
];
// type Props = RouteComponentProps<
//   {},
//   StaticContext,
//   { from: { pathname: string } }
// >;
// interface OwnProps extends Props {}

// interface DispatchProps {
//   setHasSeenTutorial: typeof setHasSeenTutorial;
//   setMenuEnabled: typeof setMenuEnabled;
// }

interface TutorialProps extends RouteComponentProps {}

const Tutorial: React.FC<TutorialProps> = ({
  history,
  //   setHasSeenTutorial,
  //   setMenuEnabled,
}) => {
  const app = useApp();
  const location = history.location;

  useIonViewWillEnter(() => {
    // setMenuEnabled(false);
    console.log("here");
  });

  const startApp = async () => {
    // await setHasSeenTutorial(true);
    // await setMenuEnabled(true);
    // history.push("/tabs/schedule", { direction: "none" });
    Storage.set({
      key: "hasSeenTutorial",
      value: "true",
    });
    // app.setHasSeenTutorial(true);
    // dispatch({
    //   type: AppActionTypes.SET_HAS_SEEN_TUTORIAL,
    //   payload: {
    //     hasSeenTutorial: true,
    //   },
    // });
    history.push("/login");
  };

  return (
    <IonPage id="tutorial-page">
      <IonHeader no-border>
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding" scroll-y="false">
        <IonSlides pager={true}>
          <IonSlide>
            <img
              src="http://placekitten.com/g/200/300"
              alt=""
              className="slide-image"
            />
            <h2 className="slide-title">
              Welcome to <b>ICA</b>
            </h2>
            <p>
              The <b>ionic conference app</b> is a practical preview of the
              ionic framework in action, and a demonstration of proper code use.
            </p>
          </IonSlide>

          <IonSlide>
            <img
              src="http://placekitten.com/g/200/300"
              alt=""
              className="slide-image"
            />
            <h2 className="slide-title">What is Ionic?</h2>
            <p>
              <b>Ionic Framework</b> is an open source SDK that enables
              developers to build high quality mobile apps with web technologies
              like HTML, CSS, and JavaScript.
            </p>
          </IonSlide>

          <IonSlide>
            <img
              src="http://placekitten.com/g/200/300"
              alt=""
              className="slide-image"
            />
            <h2 className="slide-title">What is Ionic Appflow?</h2>
            <p>
              <b>Ionic Appflow</b> is a powerful set of services and features
              built on top of Ionic Framework that brings a totally new level of
              app development agility to mobile dev teams.
            </p>
          </IonSlide>

          <IonSlide>
            <img
              src="http://placekitten.com/g/200/300"
              alt=""
              className="slide-image"
            />
            <h2 className="slide-title">Ready to Play?</h2>
            <IonButton fill="clear" onClick={startApp}>
              Continue
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </IonSlide>
        </IonSlides>
        <p className="ion-padding-start ion-padding-end">
          <IonButton expand="block" fill="solid" onClick={startApp}>
            Get Started
          </IonButton>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Tutorial;
