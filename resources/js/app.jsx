import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from './router';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <AuthProvider>
            <Router />
        </AuthProvider>
    </React.StrictMode>
);