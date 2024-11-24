import React, { createContext, useContext, useState } from "react";

const NotificationsContext = createContext();


export const NotificationProvider = ({ children }) => {

    const [notification, setNotifocation] = useState({ message: '', type: '' });


    const showSuccess = (message) => {
        setNotifocation({ message: message, type: 'success' });
    };

    const showError = (message) => {
        setNotifocation({ message: message, type: 'error' });
    };

    const showInfo = (message) => {
        setNotifocation({ message: message, type: 'info' });
    };

    const clearNotification = (message) => {
        setNotifocation({ message: '', type: '' });
    };

    return <NotificationsContext.Provider
        value={{ notification, showSuccess, showError, showInfo, clearNotification }}>
             {children}
    </NotificationsContext.Provider >
}

// hook to use notification context
export const useNotification = () => useContext(NotificationsContext);