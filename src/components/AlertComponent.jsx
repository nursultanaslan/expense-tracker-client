import { Alert, Snackbar } from "@mui/material"
import { useState } from "react"

const AlertComponent = ()=>{

    const[open, setOpen] = useState(false);     //snacbar başta kapalı olarak ayarlandı
    const[isSuccess, setIsSuccess] = useState(null);  //başarılı olma durumuna gore iki alertten biri açılacak.
    const[message, setMessage] = useState('');

    return(
        <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={()=> setOpen(false)}
        >
            <Alert
            />
        </Snackbar>
    )
}