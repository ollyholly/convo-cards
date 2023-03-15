import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Timer from './pages/Timer';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    blacky: {
      main: '#222222',
      contrastText: '#fff'
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/questions/:id" element={<Questions />} />
      <Route exact path="/questions" element={<Home />} />
      <Route exact path="/timer" element={<Timer />} />
      <Route path="*" element={<h1>404 not found</h1>} />
    </Routes>
    </ThemeProvider>
  );
};

export default App;
