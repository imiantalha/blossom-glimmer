const EmptyState = ({
    title = "No records found",
    description = "There is no data available to display.",
    icon = <i className="bi bi-inbox display-4 text-secondary"></i>,
    action = null,
}) => {
    return (
        <div className="text-center py-5">

            <div className="mb-3">
                {icon}
            </div>

            <h5 className="fw-semibold">
                {title}
            </h5>

            <p className="text-muted mb-4">
                {description}
            </p>

            {action}

        </div>
    );
};

export default EmptyState;