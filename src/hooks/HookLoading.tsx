import { useIonLoading } from "@ionic/react";
import { useCallback, useMemo } from "react";

// hook to hanbdle the loading
export function useLoading() {
    const [present, dismiss] = useIonLoading();

    const presentLoading = useCallback(async (message?: string)=>{
        console.log("Presenting");
        return await present({
            message,
            spinner: "dots",
            //duration: 3000
          })
    }, [present]);

    const dismissLoading = useCallback(async ()=>{
        console.log("Dismissing");
        await dismiss()
    }, [dismiss]);

    return useMemo(()=>{
        return {presentLoading, dismissLoading};
    }, [presentLoading, dismissLoading])
}