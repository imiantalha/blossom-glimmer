import logo from "../../assets/images/logo.png";
import "./Loader.css";

const Loader = ({
    message = "Preparing your workspace...",
}) => {
    return (
        <div className="loader-container">

            <img
                src={logo}
                alt="Blossom Glimmer"
                className="loader-logo"
            />

            <p className="loader-message">
                {message}
            </p>

            <div className="loader-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>
    );
};

export default Loader;