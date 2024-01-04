import { IonLoading } from "@ionic/react";
import React, { useCallback, useMemo, useState } from "react";

// hook to hanbdle the loading
export function useLoading() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const presentLoading = useCallback(async (message?: string)=>{
        console.log("Presenting");
        setMessage(message ?? "")
        setOpen(true);
    }, []);

    const dismissLoading = useCallback(async ()=>{
        console.log("Dismissing");
        setMessage("")
        setOpen(false);
    }, []);

    const loadingElement = useMemo(()=><IonLoading isOpen={open} spinner={"dots"} message={message}/>, [message, open])

    return useMemo(()=>{
        return {presentLoading, dismissLoading, loadingElement};
    }, [presentLoading, dismissLoading, loadingElement])
}