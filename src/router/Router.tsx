import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PlaceOrder from "../pages/PlaceOrder";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import About from '../pages/About';



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
        ],
        errorElement: <App />
    },
]);



export default router