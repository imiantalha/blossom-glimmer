import Toast from "./Toast";

const Toaster = ({
    toasts = [],
    removeToast,
}) => {
    return (
        <div
            className="toast-container position-fixed top-0 end-0 p-3"
            style={{ zIndex: 1080 }}
        >
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    type={toast.type}
                    message={toast.message}
                    duration={toast.duration}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
};

export default Toaster;