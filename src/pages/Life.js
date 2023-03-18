import { Grid, Box, Tooltip, Stack, TextField, Container, Typography} from '@mui/material';
import { useState, useEffect} from 'react';
import styled from 'styled-components';


const WeekBox = styled(Box)`
  width: 14px;
  height: 14px;
  border: 1px solid #66C3D1;
  background: ${({ weekStatus }) =>
    weekStatus === 'past'
      ? '#D0EDF1'
      : weekStatus === 'current'
      ? '#FFEFB4'
      : 'white'};
  margin-right: -1px;
`;

const YearLabel = styled.div`
  display: inline-block;
  width: 40px;
  text-align: right;
  margin-right: 8px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const WeekGrid = () => {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [weeks, setWeeks] = useState([]);


  const handleDateChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  useEffect(() => {
    if (dateOfBirth) {
      setWeeks(generateWeeks());
    } else {
      setWeeks([]);
    }
  }, [dateOfBirth]);

  const generateWeeks = () => {
    const weeks = [];
    const birthDate = new Date(dateOfBirth);
    const birthYear = birthDate.getFullYear();
    const birthTime = birthDate.getTime();
    const oneWeekTime = 1000 * 60 * 60 * 24 * 7;

    const januaryFirst = new Date(birthYear, 0, 1);
    const januaryFirstTime = januaryFirst.getTime();
    const weeksBeforeBirth = Math.floor((birthTime - januaryFirstTime) / oneWeekTime);

    for (let i = 0; i < 90 * 52; i++) {
      const startOfWeek = new Date(januaryFirstTime + oneWeekTime * i);
      const endOfWeek = new Date(januaryFirstTime + oneWeekTime * (i + 1) - 1);
      let weekStatus;

      if (i < weeksBeforeBirth) {
        weekStatus = 'beforeBirth';
      } else {
        weekStatus =
          startOfWeek < birthTime && endOfWeek < birthTime
            ? 'beforeBirth'
            : startOfWeek < Date.now() && endOfWeek < Date.now()
            ? 'past'
            : startOfWeek <= Date.now() && endOfWeek >= Date.now()
            ? 'current'
            : 'future';
      }
      
      weeks.push({ startOfWeek, endOfWeek, weekStatus });
    }

    return weeks;
  };

  const renderWeeks = () => {
    const rows = [];

  for (let i = 0; i < 90; i++) {
    const row = weeks.slice(i * 52, (i + 1) * 52).map((week, index) => (
      <Tooltip
        key={index}
        title={`${week.startOfWeek.toDateString()} - ${week.endOfWeek.toDateString()}`}
        arrow
      >
        <WeekBox weekStatus={week.weekStatus} />
      </Tooltip>
    ));

    const year = new Date(dateOfBirth).getFullYear() + i;
  
      rows.push(
        <Row key={i}>
          <YearLabel>
            <Typography >
              {year}
            </Typography>
            </YearLabel>
          <Grid container spacing={1} sx={{margin: '-1px'}}>
            {row}
          </Grid>
        </Row>
      );
    }
  
    return rows;
  };
  const calculateAge = (dob) => {
    const currentDate = new Date();
    const birthDate = new Date(dob);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
  
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };
  
  const calculateWeeksPassedThisYear = () => {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const timeDiff = currentDate.getTime() - startOfYear.getTime();
    const weeksPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
    return weeksPassed;
  };
  
  const calculateWeeksLeftThisYear = () => {
    const currentDate = new Date();
    const endOfYear = new Date(currentDate.getFullYear(), 11, 31);
    const timeDiff = endOfYear.getTime() - currentDate.getTime();
    const weeksLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
    return weeksLeft;
  };

  return (
    <>
      <Box mb={3}>
        <Stack direction="row" spacing={3} alignItems="center">
        <TextField
        label="Date of Birth"
        
        type="date"
        value={dateOfBirth}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {dateOfBirth && (<>
        <Typography>Age: {calculateAge(dateOfBirth)} </Typography>
          <Typography> Weeks passed this year: {calculateWeeksPassedThisYear(dateOfBirth)} </Typography>
          <Typography>Weeks left this year: {calculateWeeksLeftThisYear(dateOfBirth)}</Typography>
          </>
      )}
      </Stack>
      </Box>
      {dateOfBirth && renderWeeks()}
    </>
  );
};



const Life = () => {

  return (
    <Container maxWidth="md">
      <Typography variant="h1" marginBottom={3}>Week Grid</Typography>
      <WeekGrid />
    </Container>
  );
};

export default Life;
