import {Controller, useFormContext} from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function RHFDate({name}){

    const {control} = useFormContext();

    return(
        <Controller
        name={name}
        control={control}
        render={({ field: { onBlur, value, onChange}, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={value ? dayjs(value) : null}
                format='DD-MM-YYYY'
                label='Tarih'
                onChange={(newValue) => {
                  onChange(newValue ? newValue.format('YYYY-MM-DD') : '');
                }}
                onClose={onBlur}
                slotProps={{ textField: { size: 'small' }, }}
              />
            </LocalizationProvider>
          )}
          />
    )
}