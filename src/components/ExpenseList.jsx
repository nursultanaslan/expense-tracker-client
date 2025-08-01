import { Button, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Dialog,Container } from "@mui/material";
import { useEffect, useState } from "react";
import http from '../http-common';


const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [showList, setShowList] = useState(false);   //listeyi göster. başlangıçta liste görünmüyor olarak ayarlandı.

    const [deleteId, setDeleteId] = useState(null);    //hangi id'li veriyi silecegimiz.
    const [confirmOpen, setConfirmOpen] = useState(false); //onay kutusu açık mı kapalı mı?

    const [editingExpense, setEditingExpense] = useState(false);

    const deleteExpense = async (id) => {
        try {
            await http.delete(`/api/expenses/${id}`);
            setExpenses(expenses.filter(e => e.id !== id));
        } catch (error) {
            console.log('Silme işlemi başarısız!', error);
        }
    }

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await http('/api/all-expenses');
                setExpenses(response.data);
            } catch (error) {
                console.log('Error fetching expenses', error);
            }
        };
        if (showList) {
            fetchExpenses();
        }
    }, [showList])

    return (
        <Container>
            <Button variant="contained" onClick={() => setShowList(!showList)}>Harcamaları Listele</Button>
            {
                showList && (   //listeyi görüntüle: true ise harcamaları getir. 
                    <List>
                        {expenses.map((expense) => (
                            <ListItem key={expense.id}>
                                <ListItemText
                                    primary={`Kategori: ${expense.category}`}
                                    secondary={`Fiyat: ${expense.amount} | Tarih: ${expense.date} | Açıklama: ${expense.description}`} />
                                <Button variant="outlined" sx={{ ml: 5}}>Düzenle</Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    sx={{ ml: 2 }}
                                    onClick={() => {
                                        setDeleteId(expense.id);
                                        setConfirmOpen(true);
                                    }}
                                >
                                    Sil
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                )
            }
            <Dialog 
            onClose={() => setConfirmOpen(false)} 
            open={confirmOpen}
            closeAfterTransition={false}
            >
                <DialogTitle>Silmek istediğine emin misin?</DialogTitle>
                <DialogContent>Bu işlem geri alınamaz.</DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setConfirmOpen(false)} >Vazgeç</Button>
                    <Button variant="outlined" autoFocus sx={{ ml: 5}} onClick={() => {
                        deleteExpense(deleteId)
                        setConfirmOpen(false);}}
                    >
                        Evet, Sil.
                    </Button>
                </DialogActions>

            </Dialog>
        </Container>

    )

}

export default ExpenseList;