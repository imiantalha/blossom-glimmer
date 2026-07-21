import { BrowserRouter, Routes, Route } from "react-router-dom";

import GuestLayout from '../layouts/GuestLayout';
import DashboardLayout from '../layouts/DashboardLayout';

import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<GuestLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                </Route>
            </Routes>    
        </BrowserRouter>
    );
}