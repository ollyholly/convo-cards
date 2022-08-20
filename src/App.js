import { Container, Box, Typography, Card } from '@mui/material';
// import data from './Assets/questions.json';
// import { useEffect } from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { motion } from 'framer-motion';
import styled from 'styled-components'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';


const theme = createTheme({
  palette: {
    blacky: {
      main: '#222222',
      contrastText: '#fff'
    }
  }
});

const Arrow = styled(Box)`
border-radius: 50%;
border: solid 1px grey;
padding: 5px;
width: 30px;
height: 30px;
`

const content = [1,2,3,4,5,6,7,8]

const App = () => {
  // const [rolledDice, setRolledDice] = useState([]);

  const [q, setQ] = useState(0)


  const handleRightCLick = () => {
    q === content.length-1 ? setQ(0) : setQ(q+1)
  }
  const handleLeftCLick = () => {
    q === 0 ? setQ(content.length-1) : setQ(q-1)
  }

  useEffect(() => {
    
  }, []);

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h3" gutterBottom my={5} align="center">
            let&apos;s talk about...
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            alignContent: 'center',
            justifyContent: 'center'
          }}
          mb={5}
        >
          <Arrow variant='outlined' onClick={handleLeftCLick}>
          <KeyboardArrowLeftOutlinedIcon/>
          </Arrow>
    
            <Box m={1}>
              <Card variant="outlined">
                <Box p={2}>
                  <Typography variant="h3">{content[q]}</Typography>
                </Box>
              </Card>
            </Box>
            <Arrow variant='outlined' onClick={handleRightCLick}>
          <KeyboardArrowRightOutlinedIcon/>
          </Arrow>
        </Box>
      </ThemeProvider>
    </Container>
  );
};

export default App;
