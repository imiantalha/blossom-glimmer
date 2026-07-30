import { useState } from "react";

const PasswordInput = ({
    label,
    name,
    value,
    onChange,
    error,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-3">
            <label className="form-label">
                {label}
            </label>

            <div className="input-group">
                <input
                    type={showPassword ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`form-control ${
                        error ? "is-invalid" : ""
                    }`}
                />

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                        setShowPassword(!showPassword)
                    }
                >
                    <i
                        className={`bi ${
                            showPassword
                                ? "bi-eye-slash"
                                : "bi-eye"
                        }`}
                    />
                </button>

                {error && (
                    <div className="invalid-feedback d-block">
                        {Array.isArray(error)
                            ? error[0]
                            : error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordInput;