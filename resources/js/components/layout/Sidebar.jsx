import { NavLink } from "react-router-dom";

const Sidebar = () => {
    <aside className="sidebar">
        <nav>
            <NavLink to="/">
                Dashboard
            </NavLink>
            
            <NavLink to="/users">
                Users
            </NavLink>

            <NavLink to="/roles">
                Roles
            </NavLink>

            <NavLink to="/permissions">
                Permissions
            </NavLink>

            <NavLink to="/request-logs">
                Request Logs
            </NavLink>
        </nav>
    </aside>
};

export default Sidebar;