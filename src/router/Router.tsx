import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PlaceOrder from "../pages/PlaceOrder";
// import Contact from "../pages/Contact";
import Home from "../pages/Home";
import About from '../pages/About';
import Pictures from "../pages/Pictures";
import PageNotFound from "../pages/404";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/PlaceOrder",
                element: <PlaceOrder />,
            },
            // {
            //     path: "/Contact",
            //     element: <Contact />,
            // },
            {
                path: "/About",
                element: <About />,
            },
            {
                path: "/Pictures",
                element: <Pictures />,
            },
        ],
        errorElement: <PageNotFound />
    },
]);

export default router