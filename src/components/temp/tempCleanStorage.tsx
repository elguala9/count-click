import React, { useCallback } from 'react';
import { IonButton } from '@ionic/react';
import { useCounterData, useSectionData } from '../../hooks/HooksData';
import { hashString } from '../../utility/HashUtility';
import { storage } from '../../App';


// base nutton of the application that will be used to update a counter
const TempCleanStorage: React.FC = () => {


    const onClick = useCallback(()=>{
        storage.clear();
        
    }, [])

    return (
        <IonButton onClick={onClick}>
        Clear
        </IonButton>
    );
};

export default TempCleanStorage;
