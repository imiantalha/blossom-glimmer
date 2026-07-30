const Input = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    error,
    required = false,
}) => {
    return (
        <div className="mb-3">
            {label && (
                <label className="form-label">
                    {label}
                </label>
            )}

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`form-control ${
                    error ? "is-invalid" : ""
                }`}
            />

            {error && (
                <div className="invalid-feedback">
                    {Array.isArray(error) ? error[0] : error}
                </div>
            )}
        </div>
    );
};

export default Input;