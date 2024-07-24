import { Masonry } from '@mui/lab';
import { useEffect, useState } from 'react';
import { CardMedia, CircularProgress } from "@mui/material";
import { appImages, getAppImages } from '../services/firebase/Calls';

export default function Pictures() {
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                await getAppImages();
            } catch (error) {
                console.error("Failed to fetch images:", error);
            } finally {
                setLoading(false);
            }
        };

        if (appImages.length === 0) {
            fetchImages();
        } else {
            setLoading(false); // If images are already available, stop loading
        }
    }, []);

    if (isLoading) return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;

    return (
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2} sx={{ padding: 1 }}>
            {appImages.map((image, index) => (
                <CardMedia
                    key={index}
                    image={image}
                    component="img"
                    sx={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                    }}
                />
            ))}
        </Masonry>
    );
}
