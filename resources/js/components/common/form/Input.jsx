const Input = ({
    label,
    error,
    iconLeft,
    iconRight,
    className = "",
    ...props
}) => {
    return (
        <div className="mb-3">
            {label && (
                <label
                    htmlFor={props.name}
                    className="form-label"
                >
                    {label}
                    {props.required && (
                        <span className="text-danger ms-1">*</span>
                    )}
                </label>
            )}

            <div className="input-group">
                {iconLeft && (
                    <span className="input-group-text">
                        {iconLeft}
                    </span>
                )}

                <input
                    {...props}
                    id={props.name}
                    className={`form-control ${error ? "is-invalid" : ""} ${className}`}
                />

                {iconRight && (
                    <span className="input-group-text">
                        {iconRight}
                    </span>
                )}

                {error && (
                    <div className="invalid-feedback">
                        {Array.isArray(error) ? error[0] : error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;