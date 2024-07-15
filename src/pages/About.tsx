import { Box, Typography } from "@mui/material";

export default function About() {


    return (
        <Box sx={{ justifyContent: 'space-around', textAlign: 'center', paddingTop: 5 }} >
            <Typography variant="h4"> Our Story: From Code to Crust </Typography>
            <Box sx={{ height: 25, width: '100%' }} />
            <Typography >
                At Cohen's Bagelry, every bagel tells a story. It's a tale that began in the heart of a Jewish household just outside of San Francisco,
                where the aroma of fresh bagels and sourdough filled the air. Growing up, I was immersed in the rich traditions of my family's love for quality bread.
                Visits to my grandparents were a special treat, marked by the arrival of the finest bagels and bialys from New York—a testament to their commitment to
                excellence and authenticity.
                <br />
                <br />
                But life took an unexpected turn. At 18, I joined the military, embracing the discipline and dedication that service demands. After my stint in the army,
                I transitioned to a career as a software engineer. Yet, amidst the lines of code and the rigors of military service, the comforting memory of those perfect
                bagels never faded.
                <br />
                <br />

                Driven by a passion for craftsmanship and a desire to bring a piece of my heritage to the community, I made a bold decision: to leave behind the world of
                software and the discipline of the army to pursue my true calling—baking. Combining the precision of engineering with the dedication and perseverance
                instilled by my military experience, I set out to create bagels that are not just food, but an experience.
                <br />
                <br />

                At Cohen's Bagelry, we honor those cherished memories and traditions by using only the finest ingredients and time-honored techniques.
                Our bagels are hand-rolled, boiled, and baked to perfection, just like the ones that graced the tables of my childhood. Every bite is a nod to the past,
                crafted with the same love and attention to detail that my grandparents demanded from their New York bagels.
                <br />
                <br />

                Join us on this journey from code to crust, and savor the flavors that have been generations in the making.
                Welcome to Cohen's Bagelry, where every bagel is a piece of home.
            </Typography>
        </Box>
    )
};
