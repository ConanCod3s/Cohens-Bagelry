import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import About from '../pages/About';
import PageNotFound from '../pages/404';
import OrderPage from '../pages/OrderPage';
import Home from '../pages/Home';
import { UserProvider } from '../services/providers/User';

interface RouteConfig {
    path: string;
    element: JSX.Element;
    children?: RouteConfig[];
    errorElement?: JSX.Element;
}

const routes: RouteConfig[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/Order', element: <OrderPage /> },
            { path: '/About', element: <About /> },
        ],
        errorElement: <PageNotFound />,
    },
];

export const getPages = () => {
    const pages: { path: string }[] = [];

    const extractPaths = (routes: RouteConfig[]) => {
        routes.forEach((route) => {
            if (route.path) {
                pages.push({ path: route.path });
            }
            if (route.children) {
                extractPaths(route.children);
            }
        });
    };

    extractPaths(routes);

    return pages;
};

const router = createBrowserRouter(routes);

const Router = () => {
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
};

export default Router;
