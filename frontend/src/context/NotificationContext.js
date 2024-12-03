import React, { createContext, useContext, useState } from "react";

const NotificationsContext = createContext();


export const NotificationProvider = ({ children }) => {

    const [notification, setNotification] = useState({ message: '', type: '' });


    const showSuccess = (message) => {
        setNotification({ message: message, type: 'success' });
    };

    const showError = (message) => {
        setNotification({ message: message, type: 'error' });
    };

    const showInfo = (message) => {
        setNotification({ message: message, type: 'info' });
    };

    const clearNotification = () => {
        setNotification({ message: '', type: '' });
    };

    return <NotificationsContext.Provider
        value={{ notification, showSuccess, showError, showInfo, clearNotification }}>
        {children}
    </NotificationsContext.Provider >
}

// hook to use notification context
export const useNotification = () => useContext(NotificationsContext);