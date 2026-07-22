import { Outlet } from 'react-router-dom';

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function DashboardLayout() {
    return (
        <>
            <Navbar />

            <div className="dashboard-fluid">
                
                <div className="row">
                    <Sidebar />

                    <main className="col-md-10 py-4">

                        <Outlet />

                    </main>
                </div>
            </div>
        </>
    );
}