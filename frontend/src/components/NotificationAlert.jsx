import React from "react";
import { useNotification } from "../context/NotificationContext";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

const NotificationAlert = () => {
    const { notification, clearNotification } = useNotification();

    return (
        <>
            {notification.message && (
                <Snackbar open={true} autoHideDuration={5000} onClose={clearNotification}>
                    <Alert severity={notification.type} onClose={clearNotification}>
                        <AlertTitle>{notification.type}</AlertTitle>
                        {notification.message}
                    </Alert>
                </Snackbar>
            )}
        </>
    )

}


export default NotificationAlert;
