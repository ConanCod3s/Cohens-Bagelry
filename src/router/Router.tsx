import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import About from '../pages/About';
import Pictures from '../pages/Pictures';
import PageNotFound from '../pages/404';
import OrderPage from '../pages/OrderPage';
import Login from '../pages/LoginContainer';

import { UserProvider } from '../services/providers/User';
import Home from '../pages/Home';

// Keeping this as an example just in case/Protect this route
/*
*   import { UserProvider, useUser } from '../services/providers/User';
*   import { Navigate, Outlet } from 'react-router-dom';
*   const PrivateRoute = () => {
*       const { loggedIn } = useUser();
*       return loggedIn ? <Outlet /> : <Navigate to="/login" />;
*   };
*   {
*       path: "/Order",
*           element: <PrivateRoute />,
*               children: [
*                   {
*                       path: "",
*                       element: <OrderPage />,
*                   }
*               ]
*   },
*/

/**Cus im lazy im going to auto generate the headers I need from here and export them to Header
 * this way I wont have to update two places, just this one
 */
export const getPages = () => {
    const pages: any[] = [];
    const routerRoutes = router.routes;
    routerRoutes.forEach((arr) => {
        arr.children?.forEach((obj) => {
            pages.push({
                path: obj.path,
            });
        });
    });

    return pages;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            /** Pages will be generated from these */
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/Order",
                element: <OrderPage />,
            },
            {
                path: "/About",
                element: <About />,
            },
        ],
        errorElement: <PageNotFound />
    },
]);

const Router = () => {
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
};

export default Router;