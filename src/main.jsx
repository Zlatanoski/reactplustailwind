import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure this path points to your App component
import { DevSupport } from "@react-buddy/ide-toolbox"; // Optional, for React Buddy
import { ComponentPreviews, useInitial } from './dev/index.js'; // Optional, for React Buddy
import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root')); // This should match the ID in your index.html
root.render(
    <React.StrictMode>
        <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
            <App />
        </DevSupport>
    </React.StrictMode>
);
