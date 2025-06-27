import { Card, CardContent, Typography, Divider, Stack, Box, Grid, Container } from "@mui/material";
import currencyList from "../constant/currencyList";
import { Fragment, useEffect, useState } from 'react';
import 'flag-icons/css/flag-icons.min.css';


const Dasboard = () => {
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    fetch("https://api.frankfurter.app/latest?from=TRY")
      .then((res) => res.json())                //json'a döndü veriler
      .then((data) => {
        console.log("Api'den gelen Data", data);
        setExchangeRates(data.rates);
      })
      .catch((error) => {
        console.log('Veri fetch edilirken hata oluştu.', error);
      })
  }, []);

  return (
    <Container maxWidth= "xl">
      <Card sx={{
        width: '100%',
        boxShadow: 5,
        borderRadius: 3,
        p: { xs: 1, sm: 2, md: 3 }                       //iç boşluklar
      }}>
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent='space-between'>
            <Typography gutterBottom sx={{ fontSize: { xs: '16px', md: '20px' } }}>
              Döviz cinsi
            </Typography>
            <Stack direction='row' spacing={3}>
              <Typography gutterBottom sx={{ fontSize: { xs: '16px', md: '20px' } }}>Alış fiyatı(TL)</Typography>
              <Typography gutterBottom sx={{ fontSize: { xs: '16px', md: '20px' } }}> Satış Fiyatı(TL)</Typography>
            </Stack>
          </Stack>
          <Divider />
          {currencyList.map(currency => {
            const rate = exchangeRates[currency.code];    //apiden gelen o anki doviz oranı 
            const buyPrice = rate ? (1 / rate) : null;    //1 birim dövizin tl karsılıgı 
            const sellPrice = buyPrice ? (buyPrice * 1.01).toFixed(4) : '-';   //%1 kar eklenmiş hali
            return (
              <Fragment key={currency.id}>
                <Grid container spacing={2} alignItems="center" py={1}>
                  <Grid size={{ xs: 12, sm: 6 }} >
                    <Stack direction="row" alignItems="center" spacing={2}>
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
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography sx={{ width: { xs: '70px', md: '100px' } }}>
                      {buyPrice ? buyPrice.toFixed(4) : "-"}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography sx={{ width: { xs: '70px', md: '100px' } }}textAlign="right">
                      {sellPrice}
                    </Typography>
                  </Grid>

                </Grid>
                <Divider />
              </Fragment>
            )
          })}

        </CardContent>
      </Card>
      </Container>
    
  )
}
export default Dasboard;