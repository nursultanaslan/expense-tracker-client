import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({ 
    category : Yup.string().required('Kategori alanı girilmelidir.'),
    amount : Yup.string().matches(/^\d+$/, 'Geçerli bir sayı giriniz.'),
    date : Yup.string(). required('Tarih alanı gerekli'),
    description : Yup.string().required('Açıklama alanı girilmelidir.')

})

export const initialValues = {    //Form icerisindeki alanların başlangıç degeri
    category : '',
    amount : '',
    date : '',
    description : ''
}