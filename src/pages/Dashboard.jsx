import { Card, CardContent, Typography, Divider, Stack, Box } from "@mui/material";
import currencyList from "../constant/currencyList";
import { Fragment, use, useEffect, useState } from 'react';
import 'flag-icons/css/flag-icons.min.css';




const Dasboard = () => {
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        fetch("https://api.frankfurter.app/latest?from=TRY")
            .then((res) => res.json())    //json'a döndü veriler
            .then((data) => {
                console.log("Api'den gelen Data", data);
                setExchangeRates(data.rates);
            })
            .catch((error) => {
                console.log('Veri fetch edilirken hata oluştu.', error);
            })
    }, []);

    return (
        <>
            <Card sx={{
                width: 600,
                height: 300,
                boxShadow: 5,
                borderRadius: 3,
                p: 2 //iç boşluklar
            }}>
                <CardContent>
                    <Stack direction="row" justifyContent='space-between'>
                        <Typography gutterBottom variant="h3" sx={{ fontSize: '20px' }}>
                            Döviz cinsi
                        </Typography>
                        <Stack direction='row' spacing={3}>
                            <Typography gutterBottom variant="h3" sx={{ fontSize: '20px' }}>Alış fiyatı(TL)</Typography>
                            <Typography gutterBottom variant="h3" sx={{ fontSize: '20px' }}> Satış Fiyatı(TL)</Typography>
                        </Stack>
                    </Stack>
                    <Divider />
                    {currencyList.map(currency => {
                        const rate = exchangeRates[currency.code];    //apiden gelen o anki doviz oranı 
                        const buyPrice = rate ? (1 / rate) : null;    //1 birim dövizin tl karsılıgı 
                        const sellPrice = buyPrice ? (buyPrice * 1.01).toFixed(4) : '-';   //%1 kar eklenmiş hali
                        return(
                            <Fragment key={currency.id}>
                            <Stack direction="row" alignItems="center" spacing={2} py={1}>
                              <span
                                className={`fi fi-${currency.flagUrl}`}
                                style={{ width: 30, height: 20, borderRadius: "3px" }}
                              />
                              <Box flexGrow={1}>
                                <Typography fontWeight="bold">{currency.code}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {currency.name}
                                </Typography>
                              </Box>
                              <Typography sx={{ width: 100 }} >
                                {buyPrice ? buyPrice.toFixed(4) : "-"}
                              </Typography>
                              <Typography sx={{ width: 100 }} textAlign="right">
                                {sellPrice}
                              </Typography>
                            </Stack>
                            <Divider />
                          </Fragment>
                        )
                    })}

                </CardContent>
            </Card>
        </>
    )
}
export default Dasboard;