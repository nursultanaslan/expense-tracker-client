import { Stack, TextField, Button, Typography, Box, InputAdornment, Alert } from '@mui/material';
import axiosInstance from '../services/axiosInstance';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();    //butona basınca sayfa yenilenir JS durur axios istegi gönderilmez. bu yuzden bunu ekledik.(unwantend default browser behavior.)
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

    if (isNaN(Number(amount))) {
      setErrorMessage('Fiyat alanı sayı olmalıdır!');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/expenses', {
        amount: Number(amount),
        category,
        description,
        date: date.format('YYYY-MM-DD'),
      });

      console.log("Expense added.", response.data);
      //harcama eklendikten sonra inputlara girilen veriler temizlenir bu sekilde.
      setAmount('');
      setCategory('');
      setDescription('');
      setDate(dayjs());
      setErrorMessage('');

      navigate('/expenses');
    } catch (error) {
      console.log("Error adding expense", error);
    }
  }

  return (
    <>
      <Stack direction='column' alignItems='center'> 
      <Typography variant='h5' sx={{ marginBottom: 5 }}>Harcama Ekleme Ekranı</Typography>
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
                slotProps={{textField: {size: 'small'}, }}
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