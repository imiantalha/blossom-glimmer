import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
    return (
        <div>
            <h1>Blossom Glimmer 🚀</h1>
            <p>Laravel + React Working</p>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('app')).render(
    <App />
);