import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handlLogout = async () => {
        await logout();
        
        navigate("/login", { replace: true });
    };

    return (
        <header className="navbar">
            <h2>Blossom Glimmer</h2>

            <div>
                <span>{user?.name}</span>

                <button onClick={handlLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;