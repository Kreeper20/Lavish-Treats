import { createContext, useContext } from "react";

type ToastContextType = {
    alertOpen: (message: string) => void;
    alertClose: (id: number) => void;
};
export const alertContext = createContext<ToastContextType | undefined>(undefined);
export const useAlertPopup = () => useContext(alertContext);