import { useEffect, useMemo, useRef, useState } from "react";
import { alertContext } from "../context/Toast-context";
import { IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";

type alertProps = {
    message: string;
    close: () => void;
};

const useTimeout = (callback: () => void) => {
    const time = useRef(callback);
    useEffect(() => {
        time.current = callback;
    }, [callback]);

    useEffect(() => {
        const Funcid = setTimeout(() => time.current(), 3000);
        return () => clearTimeout(Funcid);
    }, []);
};

export const AlertPopup = ({ message, close }: alertProps) => {
    useTimeout(() => { close(); })
    return (
        <>

            <motion.div 
                layout
                initial={{ y: -15, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={"flex items-center justify-between gap-4 bg-purple-deep text-white p-4 rounded-lg shadow-md border border-lilac-500 "}>
                <p>
                    {message}
                </p>
                <button onClick={close} className="hover:cursor-pointer text-text-muted hover:text-purple-primary transition duration-200">
                    <IconX className="w-6 h-6 " />
                </button>
            </motion.div>
        </>
    );
}
type alertProviderProps = {
    children: React.ReactNode;
};
type alertType = {
    message: string;
    id: number;
};

export const AlertProvider = ({ children }: alertProviderProps) => {
    const [alertMessage, setAlertMessage] = useState<alertType[]>([]);
    const alertOpen = (message: string) => {

        const id = new Date().getTime();
        setAlertMessage((prev) => [...prev, { message, id }]);
    };
    const alertClose = (id: number) => {
        setAlertMessage((prev) => prev.filter((popup) => popup.id !== id));
    };
    const alertContextValue = useMemo(() => ({
        alertOpen,
        alertClose,
    }), []);
    return (
        <>
            <alertContext.Provider value={alertContextValue}>
                {children}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.5 }}
                    className={`fixed right-0 top-0 z-50 flex flex-col shadow-2xl ${alertMessage.length > 0 ? "translate-x-0" : "translate-x-full"
                        }`}>
                    {alertMessage && alertMessage.map(popup => {
                        return (
                            <AlertPopup
                                key={popup.id}
                                message={popup.message}
                                close={() => alertClose(popup.id)} />
                        );
                    })}
                </motion.div>
            </alertContext.Provider>
        </>
    );
}