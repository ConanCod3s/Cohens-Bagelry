import { Card, CardMedia, CircularProgress } from "@mui/material";

import { Fragment, useEffect, useState } from 'react';
import { appImages, getAppImages } from '../constants/firebase/Calls';


export default function Pictures() {

    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getData = async () => {
            await getAppImages().then(() => {
                setLoading(!isLoading);
            });
        };
        if (appImages.length === 0)
            getData();
    }, []);

    if (isLoading && appImages.length === 0) return <CircularProgress />

    return (
        <Fragment>
            {appImages.map((image: any, sakuin: number) => (
                <Card sx={{ display: 'flex', justifyContent: 'center' }} key={sakuin}>
                    <CardMedia
                        image={image}
                        component="img"
                        sx={{
                            maxWidth: '75vw',

                        }}
                    />
                </Card>))}
        </Fragment>

    )
}