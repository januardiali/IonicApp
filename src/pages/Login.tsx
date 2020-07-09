import React, { useState, useContext } from "react";
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
import { eye, eyeOff } from "ionicons/icons";
import "./Login.scss";
import { RouteComponentProps, StaticContext } from "react-router";
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

type Props = RouteComponentProps<
  {},
  StaticContext,
  { from: { pathname: string } }
>;

interface OwnProps extends Props {}

// interface DispatchProps {
//   setIsLoggedIn: typeof setIsLoggedIn;
//   setUsername: typeof setUsername;
// }

interface LoginProps extends Props {}

const Login: React.FC<LoginProps> = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!username) {
      setUsernameError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (username && password) {
      //   await setIsLoggedIn(true);
      //   await setUsernameAction(username);

      // if (isLoggedIn) {

      // } else {
      //   dispatch({
      //     type: AppActionTypes.SET_IS_LOGGED_IN,
      //     payload: {
      //       isLoggedIn: true,
      //     },
      //   });

      // }

      Storage.set({
        key: "user",
        value: JSON.stringify({
          email: username,
        }),
      });
      const { from } = history.location.state || {
        from: { pathname: "/home" },
      };
      history.push("/home");
      // history.replace(from);
    }
  };

  return (
    <IonPage id="login-page">
      <IonHeader>
        {/* <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar> */}
      </IonHeader>
      <IonContent fullscreen>
        <div className="login-logo">
          {/* <img src="assets/img/appicon.svg" alt="Ionic logo" /> */}
          <h1>IonicApp</h1>
        </div>

        <form noValidate onSubmit={login}>
          <IonList className="ion-padding">
            <IonItem className="ion-no-padding">
              <IonLabel position="floating" color="primary">
                Email / No. Telpon
              </IonLabel>
              <IonInput
                name="username"
                type="text"
                value={username}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e) => setUsername(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>

            {formSubmitted && usernameError && (
              <IonText color="danger">
                <p className="ion-padding-start">Username is required</p>
              </IonText>
            )}

            <IonItem className="ion-no-padding">
              <IonLabel position="floating" color="primary">
                Kata Sandi
              </IonLabel>
              <IonInput
                name="password"
                type={isShowPassword ? "text" : "password"}
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>

              <IonButton
                slot="end"
                fill="clear"
                className="button-show-password"
                onClick={() => setIsShowPassword((prev) => !prev)}
              >
                <IonIcon icon={isShowPassword ? eye : eyeOff} />
              </IonButton>
            </IonItem>

            {formSubmitted && passwordError && (
              <IonText color="danger">
                <p className="ion-padding-start">Password is required</p>
              </IonText>
            )}
            <p className="ion-margin-top">Lupa Kata Sandi?</p>
          </IonList>
          <p className="ion-padding-start ion-padding-end">
            <IonButton type="submit" expand="block">
              Login
            </IonButton>
          </p>
        </form>
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonTitle className="ion-no-padding">
            Tidak memiliki akun? <a>Daftar sekarang!</a>
          </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Login;
