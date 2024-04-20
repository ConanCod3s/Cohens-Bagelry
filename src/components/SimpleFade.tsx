import { useState, useEffect, Fragment } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { getURL, getAppImages, appImages } from '../constants/firebase/Calls';

export default function SimpleFade() {
    const [img, setImg] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const getData = async () => {
            await getURL(
                "gs://cohens-bagelry-8c701.appspot.com/Step_1.png"
            ).then((res: any) => {
                console.log(res);
                setImg(res);
            });
            if (appImages.length === 0) await getAppImages();
        };
        getData();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((current) =>
                current === appImages.length - 1 ? 0 : current + 1
            );
        }, 5000);
        return () => clearInterval(timer);
    }, [appImages.length]);

    if (appImages.length === 0)
        return (
            <Box
                src={img}
                component="img"
                sx={(theme) => ({
                    paddingTop: 5,
                    height: "100%",
                    maxWidth: "100%",
                    borderRadius: "10px",
                    boxShadow: `0px 0px 5px 1px black`,
                    border: `1px solid ${theme.palette.primary.main}`,
                })}
            />
        );
    else
        return (
            <Fragment>
                {appImages.map((image, index) => (
                    <Fade
                        key={`${image}-${index}`}
                        in={index === activeIndex}
                        timeout={{ enter: 1000, exit: 1000 }}
                    >
                        <Box
                            src={appImages[index]}
                            component="img"
                            sx={(theme) => ({
                                paddingTop: 5,
                                height: "100%",
                                maxWidth: "100%",
                                borderRadius: "10px",
                                boxShadow: `0px 0px 5px 1px black`,
                                border: `1px solid ${theme.palette.primary.main}`,
                                display: index === activeIndex ? "" : "none",
                            })}
                        />
                    </Fade>
                ))}
            </Fragment>
        );
}