import { Button, Stack, Tooltip, Typography, Zoom, Box, ButtonBase, Container } from "@mui/material";
import { useState } from "react";


export default function Page404() {
    const [audio] = useState(new Audio('./static/sad-trumpet.mp3'));

    const handleHover = () => {
        const promise = audio.play();

        if (promise !== undefined) {

            promise.then(() => {
                console.log("Ses oynatılıyor.")
            }).catch(error => {
                console.log("Oynatma engellendi. Sayfanın herhangi bir yerine tıkla.", error);
            })
        }
    }



    return (
        <Container maxWidth="xl">
        <Stack direction="column" alignItems="center" spacing={2}>
            <Typography variant="h4">
                Üzgünüz, sayfa mevcut değil.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
                Aradığınız sayfa adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
            </Typography>
            <Tooltip title='Awwww!' slots={{ transition: Zoom }} followCursor>

                <Box
                    component="img"
                    src="./static/sadness.png"
                    height={400}
                    width={400}
                    mx="auto"
                    sx={{ my: { xs: 3, sm: 6 } }}
                    onMouseEnter={handleHover}
                />
            </Tooltip>
            <Button variant="contained">Ana Sayfaya Dön</Button>
        </Stack>
        </Container>
    )
}