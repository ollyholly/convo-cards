import { Container, Box, Typography, Card, Button, Stack, Select, FormControl, MenuItem, InputLabel} from '@mui/material';
import { useState, useEffect} from 'react';

import { emoji } from '../assets/emoji';

const DEFAULT_TIME_IN_SECONDS = 15

const Timer = () => {

  const [q, setQ] = useState(0);
  const [timerOn, setTimerOn] = useState(false)
  const [time, setTime] = useState(DEFAULT_TIME_IN_SECONDS);
  const mins = Math.floor(time / 60)
  const secs = Math.floor(time % 60)

  const tick = () => {
    if (mins === 0 && secs === 0)
        {handleRandom()
          reset()}
          
        setTime((time) => time -1);

};

const handleChange = (event) => {
  setTime(event.target.value);
};

const reset = () => setTime(DEFAULT_TIME_IN_SECONDS);

 
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
    tick()
  }, 1000);

  return () => clearInterval(interval);
  }

})

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
        <Stack direction="row" spacing={2}>
          <Button 
          variant="contained" 
          color="blacky"
          onClick={handleTimer}>{timerOn ? 'STOP TIMER' : 'START TIMER'}</Button>
          <Button 
          variant="contained"
          onClick={reset}>Reset</Button>
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }} marginTop={2}>
        <Typography variant="h4" my={5} align="center">
        {`${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
            </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }} marginTop={2}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={time}
    label="Time"
    onChange={handleChange}
  >
    <MenuItem value={15}>15 sec</MenuItem>
    <MenuItem value={30}>30 sec</MenuItem>
    <MenuItem value={60}>1 min</MenuItem>
    <MenuItem value={180}>3 min</MenuItem>
  </Select>
</FormControl>
        </Box>
    </Container>
  );
};

export default Timer;
