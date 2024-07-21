// import About from "../pages/About.tsx";
import OrderPage from "../pages/OrderPage.tsx";

import { Grid } from "@mui/material";
import Pictures from "./Pictures.tsx";
import { workingWindow } from "../theme/Base.tsx";

export default function App() {

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'space-around', paddingTop: 1, height: workingWindow, overflow: "hidden" }}>
            <Grid item sm={4} md={4} lg={4} sx={{ overflow: 'auto', height: '100%' }}>
                <Pictures />
            </Grid>

            <Grid item sm={8} md={8} lg={8} sx={{ overflow: 'auto', height: '100%' }}>
                <OrderPage />
            </Grid>
        </Grid>
    )
}
