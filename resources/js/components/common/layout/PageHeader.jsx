const PageHeader = ({
    title,
    subtitle,
    action = null,
}) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
                <h2 className="fw-bold mb-1">
                    {title}
                </h2>

                {subtitle && (
                    <p className="text-muted mb-0">
                        {subtitle}
                    </p>
                )}
            </div>

            {action && (
                <div>
                    {action}
                </div>
            )}

        </div>
    );
};

export default PageHeader;