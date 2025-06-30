import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Stack, Box, Container } from "@mui/material"
import {  useEffect, useState } from "react";
import currencyList from "../constant/currencyList";
import 'flag-icons/css/flag-icons.min.css';

const Home = () => {

    const [exchangeRates, setExchangeRates] = useState({});   //doviz kurlarını tut

    useEffect(() => {
        fetch('https://api.frankfurter.app/latest?from=TRY')
            .then((res) => res.json())
            .then((data) => {
                console.log('Apiden gelen veri', data);
                setExchangeRates(data.rates);   //gelen verideki rates'i alıp set ediyoruz.
            })
            .catch((error) => {
                console.log('Veri fetch edilirken hata oluştu', error);
            })
    }, []);

    return (
        
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 3,
                boxShadow: 8
            }}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell sx={{fontSize:{xs: '15px', md: '18px'}}}>Döviz Cinsi</TableCell>
                    <TableCell sx={{fontSize:{xs: '15px', md: '18px'}}}>Alış Fiyatı&nbsp;(TL)</TableCell>
                    <TableCell sx={{fontSize:{xs: '15px', md: '18px'}}}>Satış Fiyatı&nbsp;(TL)</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {currencyList.map(currency => {
                    const rate = exchangeRates[currency.code];    //apiden gelen o anki doviz oranı 
                    const buyPrice = rate ? (1 / rate) : null;    //1 birim dövizin tl karsılıgı 
                    const sellPrice = buyPrice ? (buyPrice * 1.01).toFixed(4) : '-';   //%1 kar eklenmiş hali
                    return (
                        <TableRow key={currency.id}>
                            <TableCell>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <span
                                        className={`fi fi-${currency.flagUrl}`}
                                        style={{ width: 30, height: 20, borderRadius: "3px" }}
                                    />
                                    <Box>
                                        <Typography fontWeight="bold">{currency.code}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {currency.name}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </TableCell>

                            <TableCell align="right">
                                <Typography sx={{ width: { xs: '70px', md: '100px' } }}>
                                    {buyPrice ? buyPrice.toFixed(4) : "-"}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{ width: { xs: '70px', md: '100px' } }}>
                                    {sellPrice}
                                </Typography>
                            </TableCell>

                        </TableRow>
                    )
                })}
            </TableBody>

            </Table>
        </TableContainer>
    )

}

export default Home;