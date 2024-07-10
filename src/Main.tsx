import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router/Router.tsx';
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SnackbarProvider maxSnack={3}>
            <RouterProvider router={router} />
        </SnackbarProvider >
    </React.StrictMode>,
)