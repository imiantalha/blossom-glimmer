const AuthCard = ({ title, subtitle, children }) => {
    return (
        <div className="card border-0 shadow-lg rounded-4 mt-0">
            <div className="card-body p-5">
                <h3 className="fw-bold">{title}</h3>

                <p className="text-muted">
                    {subtitle}
                </p>

                {children}
            </div>
        </div>
    );
};

export default AuthCard;