import { Outlet } from 'react-router-dom';

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function DashboardLayout() {
    return (
        <div className="dashboard-layout">
            <Navbar />
            
            <div className="dashboard-content">
                <Sidebar />

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}