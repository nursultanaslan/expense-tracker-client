import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function RHFTextField({name, amountStartAdornment, ...other}){
    
    const {control} =useFormContext();

    return(
        <Controller
        name={name}
        control={control}
        render={({field, fieldState: {error}})=>(
            <TextField
            {...field}
            size="small"
            error={!!error}
            helperText={error && error.message }
            slotProps={{
                input:{
                    startAdornment: amountStartAdornment
                }
            }}
            {...other}
            />
        )}/>

    )
}