import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const Navbar = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = async () => {

        await logout();

        navigate("/login", { replace: true });

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

            <div className="container-fluid">

                <span className="navbar-brand">

                    Blossom Glimmer

                </span>

                <div className="ms-auto d-flex align-items-center">

                    <span className="text-white me-3">

                        {user?.name}

                    </span>

                    <button
                        className="btn btn-light btn-sm"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );
};

export default Navbar;