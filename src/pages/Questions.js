import { Container, Box, Typography, Card, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

import { useParams, Link } from 'react-router-dom';

import { questions } from '../assets/questions';

const theme = createTheme({
  palette: {
    blacky: {
      main: '#222222',
      contrastText: '#fff'
    }
  }
});

const Arrow = styled(Box)`
  border: solid 1px grey;
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

const colors = {
  warmup: '#a0d2eb',
  easy: '#d0bdf4',
  medium: '#fff685',
  hard: '#feb300'
}

const Questions = () => {
  let { id } = useParams();

  
  const [q, setQ] = useState(0);
  const [category, setCategory] = useState('all');
  
  const content = category === 'all' ? questions[id] : questions[id].filter((i)=> i.category === category);
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleRightCLick = () => {
    q === content.length - 1 ? setQ(0) : setQ(q + 1);
  };
  const handleLeftCLick = () => {
    q === 0 ? setQ(content.length - 1) : setQ(q - 1);
  };

  const handleRandom = () => {
    const random = Math.floor(Math.random() * content.length);
    setQ(random);
  };


  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link to={'/questions'}>
            <Typography variant="h3" gutterBottom my={5} align="center">
              questions
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="warmup">Warm-up</MenuItem>
          <MenuItem value='easy'>Easy</MenuItem>
          <MenuItem value='medium'>Medium</MenuItem>
          <MenuItem value='hard'>Hard</MenuItem>
        </Select>
      </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Arrow variant="outlined" onClick={handleLeftCLick}>
            <KeyboardArrowLeftOutlinedIcon />
          </Arrow>

          <Box m={1}>
            <Card variant="outlined" sx={{
            bgcolor: colors[content[q].category]
          }}>
              <Box p={2}>
                <Typography >{content[q].category}</Typography>
                <Typography variant="h3">{content[q].text}</Typography>
                
              </Box>
            </Card>
          </Box>
          <Arrow variant="outlined" onClick={handleRightCLick}>
            <KeyboardArrowRightOutlinedIcon />
          </Arrow>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleRandom}>random</Button>
        </Box>
      </ThemeProvider>
    </Container>
  );
};

export default Questions;
