import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Storage } from '@ionic/storage';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import './theme/variables.css';
import SectionPage from './components/Section/SectionPage';
import SectionRoute from './components/Section/SectionRoute';

setupIonicReact();

const storage = new Storage();
storage.create();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/SectionPage/:id" component={SectionRoute}>
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
    </IonReactRouter>
  </IonApp>
);

export default App;
export { storage };
