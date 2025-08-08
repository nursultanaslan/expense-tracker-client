import { Stack, TextField, Button, Typography, Box, InputAdornment, Paper, Container } from '@mui/material';
import { useEffect } from 'react';
import http from '../http-common';
import { useForm, Controller } from "react-hook-form";
import FormProvider from './FormProvider';
import { RegisterSchema, initialValues } from '../constant/formikSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFTextField from './hook-form/RHFTextField';
import RHFDate from './hook-form/RHFDate';


const AddExpense = () => {

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: initialValues,
    mode: 'all',
    resetOptions: {
      keepErrors: false,
      keepDirty: true,
      keepDirtyValues: true,
      keepValues: false,
      keepDefaultValues: true,
      keepTouched: true,
      keepIsValid: true
    }
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    await http.post('/api/expense', {
      category: data.category,
      amount: Number(data.amount),
      date: data.date,
      description: data.description,

    });
    console.log('Harcama eklendi', data);

  }

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
    reset
  } = methods;

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful])



  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack direction='column' alignItems='center'>
        <Typography variant='h5' sx={{ marginBottom: 5, color: 'text.primary' }}>
          Harcama Ekleme Ekranı
        </Typography>
        <Paper elevation={4} sx={{ px: 6, py: 3, borderRadius: 4 }}>
          <Stack direction="column" spacing={4}>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>

                <RHFTextField
                  label='Kategori *'
                  name='category'
                />

                <RHFTextField
                  label= 'Fiyat *'
                  name='amount'
                  amountStartAdornment={<InputAdornment position='start'>₺</InputAdornment>}/>

                <RHFDate
                  label='Tarih *'
                  name='date' />

                <RHFTextField
                  label='Açıklama *'
                  name='description'
                />
                <Button
                  variant='outlined'
                  type='submit'
                >Ekle</Button>
              </Stack>
            </FormProvider>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}
export default AddExpense;