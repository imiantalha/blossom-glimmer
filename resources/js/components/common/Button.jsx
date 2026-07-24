const Button = ({
    type = "button",
    variant = "primary",
    loading = false,
    disabled = false,
    className = "",
    children,
    ...props
}) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} ${className}`}
            disabled={loading || disabled}
            {...props}
        >
            {loading ? (
                <>
                    <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                    />
                    Please wait...
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;