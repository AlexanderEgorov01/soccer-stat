import React, {useState} from 'react';

export const SettingsContext = React.createContext();

const defaultSettings = {};

export const SettingsContextProvider = ({children, settings}) => {
    const [currentSettings, setCurrentSettings] = useState(
        settings || defaultSettings
    );

    const saveSettings = (values) => {
        setCurrentSettings(values)
    };

    return (
        <SettingsContext.Provider
            value={{settings: currentSettings, saveSettings}}
        >
            {children}
        </SettingsContext.Provider>
    );
};


export const SettingsContextConsumer = SettingsContext.Consumer;

export default SettingsContext;


