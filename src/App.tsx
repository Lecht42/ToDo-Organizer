import { IonApp, setupIonicReact, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";
import "./global.css";
import { Provider } from "react-redux";
import { makeStore } from "./redux/store";
import HomeTab, { HOME_HREF } from "./pages/home/home";
import Header from "./components/header/header";
import SettingsTab, { SETTINGS_HREF } from "./components/menu/modals/settings/settings";
import Menu from "./components/menu/menu";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <Provider store={makeStore()}>
      <Header />
      <HomeTab />
      <Menu />
    </Provider>
  </IonApp>
);

export default App;
