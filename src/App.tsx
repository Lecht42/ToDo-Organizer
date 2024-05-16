import { IonApp, setupIonicReact } from "@ionic/react";
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
import "./theme/global.css";
import { Provider } from "react-redux";
import "./i18next";
import ProviderDiv from "./provider-div";
import { GoogleOAuthProvider } from "@react-oauth/google";
import googleClientId from "./credentials/google-client-id";
import store from "./redux/store";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <ProviderDiv />
      </GoogleOAuthProvider>
    </Provider>
  </IonApp>
);
export default App;
