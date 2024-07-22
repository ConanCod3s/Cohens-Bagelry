import { Masonry } from '@mui/lab';
import { useEffect, useState } from 'react';
import { CardMedia, CircularProgress } from "@mui/material";
import { appImages, getAppImages } from '../services/firebase/Calls';

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
        <Masonry columns={{ xs: 0, sm: 2, md: 3 }} spacing={2} sx={{ padding: 1 }}>
            {appImages.map((image: any, sakuin: number) => (
                <CardMedia
                    key={sakuin}
                    image={image}
                    component="img"
                    sx={{
                        width: '100%',
                        height: 'auto',
                    }}
                />
            ))}
        </Masonry>
    )
}