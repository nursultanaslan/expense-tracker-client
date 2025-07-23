import {
    Table, TableContainer, TableHead,
    TableRow, TableCell, TableBody, Paper,
    Typography, Stack, Box, SpeedDial, SpeedDialAction,
    Dialog, DialogContent,
    Autocomplete,
    TextField,
    Divider,
    InputAdornment,
    Chip
} from "@mui/material"
import { useEffect, useState } from "react";
import currencyList from "../constant/currencyList";
import 'flag-icons/css/flag-icons.min.css';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import CurrencyExchangeRounded from "@mui/icons-material/CurrencyExchangeRounded";
import axios from "axios";

const API = 'https://api.frankfurter.app/latest?from=TRY';

const Home = () => {

    const [exchangeRates, setExchangeRates] = useState({});   //doviz kurlarını tut
    const [converterOpen, setConverterOpen] = useState(false);
    const [firstSelectedCur, setFirstSelectedCur] = useState()
    const [secondSelectedCur, setSecondSelectedCur] = useState();

    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState();
    const [errorMessage, setErrorMessage] = useState('');


    const convList = currencyList.filter(currency =>
        currency.code !== 'TL'
    )

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios(API);
                const data = response.data;
                console.log('Bağlantı kuruldu, apiden gelen veri: ', data);
                setExchangeRates(data.rates);   //gelen verideki rates'i alıp set ediyoruz.
            } catch (error) {
                console.log('Veri fetch edilirken hata oluştu', error);
            }

        };
        fetchRates();
    }, []);

    useEffect(() => {
        if (amount !== '') {


        }

    }, [amount, firstSelectedCur, secondSelectedCur, exchangeRates]);

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 3,
                    boxShadow: 8
                }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: { xs: '15px', md: '18px' } }}>Döviz Cinsi</TableCell>
                            <TableCell sx={{ fontSize: { xs: '15px', md: '18px' } }}>Alış Fiyatı&nbsp;(TL)</TableCell>
                            <TableCell sx={{ fontSize: { xs: '15px', md: '18px' } }}>Satış Fiyatı&nbsp;(TL)</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {convList.map(currency => {
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

            <SpeedDial
                ariaLabel="speedDial"
                sx={{ position: 'absolute', bottom: 30, right: 30 }}
                icon={<AutoAwesomeOutlinedIcon />}
            >
                <SpeedDialAction
                    icon={<CurrencyExchangeRounded />}
                    slotProps={{ tooltip: { title: 'Currency Converter' } }}
                    onClick={() => setConverterOpen(true)} >
                </SpeedDialAction>
            </SpeedDial>


            <Dialog
                closeAfterTransition={false}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-content"
                aria-modal="true"
                open={converterOpen}
                onClose={() => {
                    setConverterOpen(false)
                    setFirstSelectedCur('')
                    setSecondSelectedCur('')
                    setAmount('')
                }}
                slotProps={{
                    paper:
                    {
                        sx: {
                            overflow: 'visible',
                            pt: 2,
                            borderRadius: 3
                        }
                    }
                }}>
                <Box
                    id="dialog-title"
                    sx={{
                        position: "absolute",
                        top: -14,
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}>
                    <Chip
                        label="Döviz Çevirici"
                        variant="outlined"
                        sx={{
                            height: 25,
                            width: '100%',
                            fontWeight: 'bold',
                            bgcolor: 'background.paper'
                        }} />
                </Box>
                <DialogContent id="dialog-content">
                    <Autocomplete
                        onChange={(event, newCurr) => setFirstSelectedCur(newCurr)}
                        options={currencyList}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => {
                            const { key, ...optionProps } = props;
                            return (
                                <Box
                                    key={key}
                                    component="li"
                                    {...optionProps} >
                                    <span
                                        className={`fi fi-${option.flagUrl}`}
                                        style={{ width: 30, height: 20, borderRadius: "3px", marginRight: 8 }} />
                                    {option.name}
                                </Box>
                            )
                        }}
                        renderInput={(params) => <TextField  {...params} label='Birim' />}
                        size="small"
                        sx={{ width: 300, pb: 2 }} />

                    <TextField
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment>{firstSelectedCur?.code}</InputAdornment>
                            }
                        }}
                        onChange={(e) =>
                            setAmount(e.target.value)}
                        value={amount}
                        size="small"
                        label="Tutar"
                        sx={{ width: 300 }} />

                    <Divider sx={{ pt: 4 }} />

                    <Autocomplete
                        onChange={(event, newCur) => setSecondSelectedCur(newCur)}
                        options={currencyList}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => {
                            const { key, ...optionProps } = props;
                            return (
                                <Box
                                    key={key}
                                    component="li"
                                    {...optionProps}>
                                    <span
                                        className={`fi fi-${option.flagUrl}`}
                                        style={{ width: 30, height: 20, borderRadius: "3px", marginRight: 8 }} />
                                    {option.name}
                                </Box>
                            )
                        }}
                        renderInput={(params) => <TextField  {...params} label="Birim" />}
                        size="small"
                        sx={{ width: 300, pt: 4, pb: 2 }} />
                    <TextField
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment>{secondSelectedCur?.code}</InputAdornment>,
                                readOnly: true
                            }
                        }}
                        value={convertedAmount}
                        size="small"
                        label="Tutar"
                        sx={{ width: 300, pb: 2}} />
                </DialogContent>

            </Dialog>

        </>
    )

}

export default Home;