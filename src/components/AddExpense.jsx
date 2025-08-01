import { Stack, TextField, Button, Typography, Box, InputAdornment, Alert, Snackbar, Fade } from '@mui/material';
import http from '../http-common';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


const AddExpense = () => {

  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(dayjs());
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successfulMessage, setSuccessfulMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null)

  const clearForm = () => {
    setAmount('');
    setCategory('');
    setDescription('');
    setDate(dayjs());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();    //forma submit gelince sayfayı yeniden yüklemeye çalışır. bunu eklersek reload onune gecmis oluruz(unwantend default browser behavior.)
    //bunun bi de e.stopPropagation() : bir event'in üst bileşenlere ulaşmasını engellemek icin kullanılır.

    if (
      !category.trim() ||
      !amount.trim() ||
      !description.trim() ||
      !date ||
      !date.isValid()
    ) {
      setErrorMessage('Lütfen tüm alanları doldurunuz!');
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
      setErrorMessage('Fiyat alanı sayı olmalıdır!');
      return;
    }

    try {
      const response = await http.post('/api/expense', {
        amount: Number(amount),
        category,
        description,
        date: date.format('YYYY-MM-DD'),
      });

      //harcama eklendikten sonra inputlara girilen veriler temizlenir bu sekilde.
      if (response.status >= 200 && response.status < 300) {
        console.log(response.status);
        console.log("Expense added successfully!", response.data);
        clearForm();

      }

      setSuccessfulMessage('Harcama Eklendi.');
      setOpen(true);
      setIsSuccess(true)

    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else if (error.request) {
        console.log('The request was made but no response was received', error.request);
      }
      setSuccessfulMessage('Harcama eklenemedi!')
      setOpen(true)
      setIsSuccess(false)
    }
  }

  return (
    <>
      <Stack direction='column' alignItems='center'>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => setOpen(false)}
        >
          {isSuccess ?
            <Alert severity='success'>{successfulMessage}</Alert> :
            <Alert severity='error'>{successfulMessage}</Alert>}

        </Snackbar>

        <Typography variant='h5' sx={{ marginBottom: 5, color: 'text.primary' }}>Harcama Ekleme Ekranı</Typography>
        <Box sx={{
          width: 300,
          borderRadius: 4,
          padding: 3,
          boxShadow: 3,
          display: 'flex',
          justifyContent: 'center', //dikeyde ortalar
          alignItems: 'center',     //yatayda ortalar  
          backgroundColor: 'white'
        }}>
          <Stack direction="column" spacing={4}>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label='Kategori'
                  size='small'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />

                <TextField
                  size='small'
                  label='Fiyat'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                    },
                  }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={date}
                    format='DD-MM-YYYY'
                    label='Tarih'
                    onChange={(e) => setDate(e)}
                    slotProps={{ textField: { size: 'small' }, }}
                  />
                </LocalizationProvider>

                <TextField
                  label='Açıklama'
                  size='small'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
                <Button variant='outlined' type='submit'>Ekle</Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>

    </>

  )
}
export default AddExpense;