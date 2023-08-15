import React, { createContext, useContext, useEffect, useState } from "react";

interface AppContextValues {
    themeMode: string;
    setThemeMode: (mode: string) => void;
    mobileMenuVisible: boolean;
    setMobileMenuVisible: (visible: boolean) => void;
    subMenuVisible: boolean;
    setSubMenuVisible: (visible: boolean) => void;
}

const AppContext = createContext<AppContextValues | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error(
            "useAppContext must be used within an AppContextProvider"
        );
    }
    return context;
};

interface AppContextProviderProps {
    children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
    children,
}) => {
    const [themeMode, setThemeMode] = useState("dark");
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [subMenuVisible, setSubMenuVisible] = useState(true);

    const contextValues: AppContextValues = {
        themeMode,
        setThemeMode,
        mobileMenuVisible,
        setMobileMenuVisible,
        subMenuVisible,
        setSubMenuVisible,
    };

    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        body.className = themeMode;
    }, [themeMode]);

    return (
        <AppContext.Provider value={contextValues}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
