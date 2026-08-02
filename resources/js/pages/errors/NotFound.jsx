import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const ErrorPage = ({
    code,
    title,
    description,
    buttonText = "Go to Dashboard",
    buttonLink = "/dashboard",
}) => {
    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
            <div className="text-center">

                <img
                    src={logo}
                    alt="Blossom Glimmer"
                    className="mb-4"
                    style={{
                        height: "70px",
                        objectFit: "contain",
                    }}
                />

                <h1 className="display-1 fw-bold text-primary mb-3">
                    {code}
                </h1>

                <h3 className="fw-semibold mb-3">
                    {title}
                </h3>

                <p
                    className="text-muted mb-4 mx-auto"
                    style={{ maxWidth: "420px" }}
                >
                    {description}
                </p>

                <Link
                    to={buttonLink}
                    className="btn btn-primary px-4"
                >
                    {buttonText}
                </Link>

            </div>
        </div>
    );
};

export default ErrorPage;