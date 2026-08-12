import { Link } from "react-router-dom";

const PageHeader = ({
    title,
    subtitle,
    breadcrumb = [],
    action = null,
}) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
                <h2 className="fw-bold mb-1">
                    {title}
                </h2>

                {subtitle && (
                    <p className="text-muted mb-2">
                        {subtitle}
                    </p>
                )}

                {breadcrumb.length > 0 && (
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">

                            {breadcrumb.map((item, index) => {
                                const isLast =
                                    index === breadcrumb.length - 1;

                                return (
                                    <li
                                        key={index}
                                        className={`breadcrumb-item ${
                                            isLast ? "active" : ""
                                        }`}
                                        aria-current={
                                            isLast
                                                ? "page"
                                                : undefined
                                        }
                                    >
                                        {isLast || !item.href ? (
                                            item.label
                                        ) : (
                                            <Link to={item.href}>
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}

                        </ol>
                    </nav>
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