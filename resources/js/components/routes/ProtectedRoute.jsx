import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loader from "../common/Loader";

const ProtectedRoute = ({ children }) => {
    const { initializing, isAuthenticated } = useAuth();

    if (initializing) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;