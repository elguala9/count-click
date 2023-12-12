import { IonGrid } from '@ionic/react';
import React, { ReactElement } from 'react';
import './ExploreContainer.css';

type BaseBoxCounterInput = {
  children: ReactElement;
}

const BaseBoxCounter: React.FC<BaseBoxCounterInput> = ({children}) => {

  return (
    <IonGrid>
      {children}
    </IonGrid>
  );
};

export default BaseBoxCounter;
