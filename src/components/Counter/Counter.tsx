import { IonCol, IonRow } from '@ionic/react';
import React, { ReactElement, useCallback } from 'react';
import ButtonCounter from '../Button/ButtonCounter';

type CounterInput = {
  onClick: (value: number)=>void;
  children: ReactElement;
}

// structure of a counter. In this component we will be abel to see the counter and the buttons to change the counter
const Counter: React.FC<CounterInput> = ({children, onClick}) => {

  const onClickMinus = useCallback(()=>{
    onClick(-1);
  }, [onClick]);

  const onClickPlus = useCallback(()=>{
    onClick(1);
  }, [onClick]);

  return (
    <IonRow>
      <IonCol>
        <ButtonCounter onClick={onClickMinus}/>
      </IonCol>
      <IonCol>
        {children}
      </IonCol>
      <IonCol>
        <ButtonCounter onClick={onClickPlus}/>
      </IonCol>
    </IonRow>
  );
};

export default Counter;
