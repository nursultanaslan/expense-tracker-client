import { ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import Router from './routes';
import ScrollToTop from './components/ScrollToTop';


function App() {

  
  const appTheme = createTheme({
    palette: {
      primary: {
        light: '#40c4ff',
        main: '#0288d1',
        dark: '#0277bd'
      }
    },
    typography: {
      fontFamily: 'Nunito, sans-serif'
    }
  });

  return (
    <ThemeProvider theme={appTheme}>
      <ScrollToTop/>
      <Router />
    </ThemeProvider>
  )
}


export default App;
