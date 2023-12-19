import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import SectionHandler from '../components/Section/SectionHandler';
import CreateSection from '../components/Section/CreateSection';
import SectionList from '../components/Section/SectionList';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Counters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SectionList/>
        <CreateSection/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
