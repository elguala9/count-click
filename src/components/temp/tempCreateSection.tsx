import React, { useCallback } from 'react';
import { IonButton } from '@ionic/react';
import { useCounterData, useSectionData } from '../../hooks/HooksData';
import { hashString } from '../../utility/HashUtility';


// base nutton of the application that will be used to update a counter
const TempCreateSection: React.FC = () => {

    const { createCounter } = useCounterData();
    const { createSection } = useSectionData();

    const onClick = useCallback(async ()=>{
        const sectionName = "Prova";
        const sectionCode = await hashString(sectionName);
        createSection({
            counters: [""],
            locked: false,
            sectionCode,
            sectionName
        })
        createCounter(sectionCode,
            {

            });
        
        
    }, [createCounter])

    return (
        <IonButton onClick={onClick}>
        Crea sezione
        </IonButton>
    );
};

export default TempCreateSection;
