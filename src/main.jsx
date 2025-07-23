import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>   {/** Bazı bileşenleri iki defa calıstırır fonksiyonun pure function olup olmadıgını test etmek icin
  yani her calıstırmada aynı sonucu veriyor mu eger veriyorsa pure functiondır. (impure function var mı onu kontrol eder.)
  Örneğin currency apiyi kullandıgımız useEffect eventi 2 defa çalıştırılır*/} 
  <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
