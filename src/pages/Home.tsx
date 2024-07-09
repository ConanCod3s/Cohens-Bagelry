import { Card, CardMedia, CircularProgress, Stack } from "@mui/material";

import { useEffect, useState } from 'react';
import { appImages, getAppImages } from '../constants/firebase/Calls';


export default function Home() {

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
        <Stack spacing={.5}>
            {appImages.map((image: any, idx: number) => (
                <Card sx={{ display: 'flex' }}>
                    <CardMedia
                        key={idx}
                        image={image}
                        component="img"
                        sx={{ width: '25vw' }}
                    />
                </Card>))}
        </Stack>

    )
}