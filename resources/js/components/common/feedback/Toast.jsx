import { useEffect, useState } from "react";

const Toast = ({
    type = "success",
    message,
    duration = 4000,
    onClose,
}) => {
    const [remaining, setRemaining] = useState(duration);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || remaining <= 0) {
            return;
        }

        const interval = setInterval(() => {
            setRemaining((previous) => {
                const next = previous - 100;

                if (next <= 0) {
                    return 0;
                }

                return next;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [paused, remaining]);

    useEffect(() => {
        if (remaining <= 0) {
            onClose();
        }
    }, [remaining, onClose]);

    const progress = duration > 0
        ? (remaining / duration) * 100
        : 0;

    const icons = {
        success: "bi-check-circle-fill",
        danger: "bi-x-circle-fill",
        warning: "bi-exclamation-triangle-fill",
        info: "bi-info-circle-fill",
    };

    return (
        <div
            className={`toast show text-bg-${type} border-0 position-relative overflow-hidden`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="d-flex">

                <div className="toast-body d-flex align-items-center">
                    <i
                        className={`bi ${icons[type]} me-2`}
                    />

                    {message}
                </div>

                <button
                    type="button"
                    className="btn-close btn-close-white me-2 m-auto"
                    aria-label="Close"
                    onClick={onClose}
                />

            </div>

            <div
                className="position-absolute bottom-0 start-0"
                style={{
                    height: "3px",
                    width: `${progress}%`,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
            />
        </div>
    );
};

export default Toast;