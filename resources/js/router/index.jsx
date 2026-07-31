import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestRoute from "../components/routes/GuestRoute";
import ProtectedRoute from "../components/routes/ProtectedRoute";

import GuestLayout from '../layouts/GuestLayout';
import DashboardLayout from '../layouts/DashboardLayout';

import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import NotFound from '../pages/errors/NotFound';
import UsersPage from "../pages/users/UsersPage";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={
                    <GuestRoute>
                        <GuestLayout />
                    </GuestRoute>
                }>
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path="/users" element={<UsersPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>    
        </BrowserRouter>
    );
}