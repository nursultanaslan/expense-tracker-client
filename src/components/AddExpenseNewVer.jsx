import { Stack, TextField, Button, Typography, Box, InputAdornment, Alert, Snackbar, Fade, Paper, Container } from '@mui/material';
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
    mode : 'all',
    resetOptions: {
      keepErrors : false, 
      keepDirty : true,
      keepDirtyValues: true,
      keepValues: false,
      keepDefaultValues: true,
      keepTouched: true,
      keepIsValid: true 
    }
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
    reset
  } = methods;

  
  useEffect(()=>{
      reset();
  }, [isSubmitSuccessful])

  const onSubmit = async (data) => {

    await http.post('/api/expense', {
      category: data.category,
      amount: Number(data.amount),
      date: data.date,
      description: data.description,
      
    });
    console.log('Harcama eklendi', data);

  }

  return (
      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Stack direction='column' alignItems='center'>
          <Typography variant='h5' sx={{ marginBottom: 5, color: 'text.primary' }}>Harcama Ekleme Ekranı</Typography>
          <Paper elevation={4} sx={{px:6, py: 3, borderRadius: 4}}>
            <Stack direction="column" spacing={4}>

              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>

                  <RHFTextField
                    label='Kategori *'
                    name='category'
                  />

                  <Controller
                    name='amount'
                    control={control}
                    rules={{ required: 'Miktar girilmesi zorunlu.' }}
                    render={({ field }) =>
                      <TextField
                        {...field}
                        label='Fiyat'
                        size='small'
                        slotProps={{
                          input: {
                            startAdornment: <InputAdornment position='start'>₺</InputAdornment>
                          }
                        }} />} />

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