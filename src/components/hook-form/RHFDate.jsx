import { Controller, useFormContext } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';

export default function RHFDate({ name, ...other }) {

  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='tr'>
          <DatePicker
            value={dayjs(value)}
            disableFuture
            format='DD-MM-YYYY'
            onChange={(newValue) => setValue("date", newValue)}
            slotProps={{textField:{
              error: !!error,
              helperText : error?.message,
              onBlur: onBlur,
              size :'small'
            }}}
            {...other}
          />
        </LocalizationProvider>
      )}
    />
  )
}