import { Container, Box, Typography, Card } from '@mui/material';
// import data from './Assets/questions.json';
// import { useEffect } from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { motion } from 'framer-motion';
import styled from 'styled-components';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

import {
  useParams
} from 'react-router-dom';

const theme = createTheme({
  palette: {
    blacky: {
      main: '#222222',
      contrastText: '#fff'
    }
  }
});

const Arrow = styled(Box)`
  // top: calc(50% - 20px);
  border: solid 1px grey;
  // position: absolute;
  background: white;
  border-radius: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  z-index: 2;
`;

const questions = {
  1: [1, 2, 3, 4, 5, 6, 7, 8],
  2: [9, 10, 11, 12, 13, 14, 15, 16],
  3: [17, 28, 39, 40, 51, 62, 73, 84],
}

const Questions = () => {
  // const [rolledDice, setRolledDice] = useState([]);

  let { id } = useParams();

  const content = questions[id]

  const [q, setQ] = useState(0);

  const handleRightCLick = () => {
    q === content.length - 1 ? setQ(0) : setQ(q + 1);
  };
  const handleLeftCLick = () => {
    q === 0 ? setQ(content.length - 1) : setQ(q - 1);
  };

  



  useEffect(() => {}, []);

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h3" gutterBottom my={5} align="center">
            questions
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
          <Arrow variant="outlined" onClick={handleLeftCLick}>
            <KeyboardArrowLeftOutlinedIcon />
          </Arrow>

          <Box m={1}>
            <Card variant="outlined">
              <Box p={2}>
                <Typography variant="h3">{content[q]}</Typography>
              </Box>
            </Card>
          </Box>
          <Arrow variant="outlined" onClick={handleRightCLick}>
            <KeyboardArrowRightOutlinedIcon />
          </Arrow>
        </Box>
      </ThemeProvider>
    </Container>
  );
};

export default Questions;
