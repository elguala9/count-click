import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import CreateSectionModal from '../components/Section/CreateSectionModal';
import SectionList from '../components/Section/SectionList';
import TempCleanStorage from '../components/temp/tempCleanStorage';

const Home: React.FC = () => {


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CounterMap</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SectionList/>
        <CreateSectionModal/>
        <TempCleanStorage/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
