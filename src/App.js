import logo from './logo.svg';
import './App.css';
import Test from './component/Test';
import { createTheme , ThemeProvider } from '@mui/material';
const theme =createTheme({
  typography:{
    fontFamily:["IBM"]
  }
})
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}> 
      <Test style={{}}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
