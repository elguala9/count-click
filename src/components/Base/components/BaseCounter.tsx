import { IonCol, IonRow } from '@ionic/react';
import React, { ReactElement, useCallback } from 'react';
import BaseButtonCounter from './BaseButtonCounter';
import './ExploreContainer.css';

type BaseCounterInput = {
  onClick: (value: number)=>void;
  children: ReactElement;
}

const BaseCounter: React.FC<BaseCounterInput> = ({children, onClick}) => {

  const onClickMinus = useCallback(()=>{
    onClick(-1);
  }, [onClick]);

  const onClickPlus = useCallback(()=>{
    onClick(1);
  }, [onClick]);

  return (
    <IonRow>
      <IonCol>
        <BaseButtonCounter onClick={onClickMinus}/>
      </IonCol>
      <IonCol>
        {children}
      </IonCol>
      <IonCol>
        <BaseButtonCounter onClick={onClickPlus}/>
      </IonCol>
    </IonRow>
  );
};

export default BaseCounter;
