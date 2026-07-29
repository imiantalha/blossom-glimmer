const StatCard = ({
    title,
    value,
    icon,
    color = "primary",
}) => {
    return (
        <div className="col-md-6 col-lg-3 mb-4">
            <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex justify-content-between align-items-center">

                    <div>
                        <small className="text-muted">
                            {title}
                        </small>

                        <h3 className="fw-bold mt-2 mb-0">
                            {value}
                        </h3>
                    </div>

                    {icon && (
                        <i
                            className={`${icon} text-${color}`}
                            style={{
                                fontSize: "2rem",
                            }}
                        />
                    )}

                </div>
            </div>
        </div>
    );
};

export default StatCard;