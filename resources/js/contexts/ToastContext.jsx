import {
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";

import Toaster from "../components/common/feedback/Toaster";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((previous) =>
            previous.filter((toast) => toast.id !== id)
        );
    }, []);

    const addToast = useCallback(
        (type, message, duration = 4000) => {
            const id =
                Date.now() + Math.random();

            setToasts((previous) => [
                ...previous,
                {
                    id,
                    type,
                    message,
                    duration,
                },
            ]);
        },
        []
    );

    const success = useCallback(
        (message, duration) =>
            addToast("success", message, duration),
        [addToast]
    );

    const error = useCallback(
        (message, duration) =>
            addToast("danger", message, duration),
        [addToast]
    );

    const warning = useCallback(
        (message, duration) =>
            addToast("warning", message, duration),
        [addToast]
    );

    const info = useCallback(
        (message, duration) =>
            addToast("info", message, duration),
        [addToast]
    );

    const value = {
        success,
        error,
        warning,
        info,
    };

    return (
        <ToastContext.Provider value={value}>
            {children}

            <Toaster
                toasts={toasts}
                removeToast={removeToast}
            />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useToast must be used inside ToastProvider"
        );
    }

    return context;
};

export default ToastContext;