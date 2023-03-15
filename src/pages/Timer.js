import { Container, Box, Typography, Card, Button } from '@mui/material';
import { useState, useEffect} from 'react';

import { emoji } from '../assets/emoji';

const TIME = 1000

const Timer = () => {

  const [q, setQ] = useState(0);
  const [timerOn, setTimerOn] = useState(false)
 
  const handleRandom = () => {
    const random = Math.floor(Math.random() * emoji.length);
    setQ(random);
  };
  const handleTimer = () => {
    setTimerOn((timerOn)=> !timerOn);
  };

useEffect(()=>{
  if (timerOn) {

  const interval = setInterval(() => {
    console.log('Logs every sec');
    handleRandom()
  }, TIME);

  return () => clearInterval(interval);
  }

}, [timerOn])

  return (
    <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h3" gutterBottom my={5} align="center">
              Timer
            </Typography>
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
          <Box m={1}>
            <Card variant="outlined" >
              <Box p={2}>
                <Typography variant="h3">{emoji[q]}</Typography>
              </Box>
            </Card>
          </Box>
         
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }} marginTop={2}>
          <Button 
          variant="contained" 
          color="blacky"
          onClick={handleTimer}>{timerOn ? 'STOP TIMER' : 'START TIMER'}</Button>
        </Box>
    </Container>
  );
};

export default Timer;
