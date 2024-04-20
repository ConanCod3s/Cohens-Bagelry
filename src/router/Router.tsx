import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PlaceOrder from "../pages/PlaceOrder";
import Contact from "../pages/Contact";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/PlaceOrder",
                element: <PlaceOrder />,
            },
            {
                path: "/Contact",
                element: <Contact />,
            },
        ],
        errorElement: <App />
    },
]);



export default router