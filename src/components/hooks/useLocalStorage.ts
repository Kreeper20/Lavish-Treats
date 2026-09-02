import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
    key: string,
    initialValue: T | (() => T)
) => {
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        const jsonValue = localStorage.getItem(key);

        if (jsonValue !== null) {
            setValue(JSON.parse(jsonValue));
        }
    }, [key]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as [T, typeof setValue];
};