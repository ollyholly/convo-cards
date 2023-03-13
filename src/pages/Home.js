import { Container, Box, Typography, Card } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import { questions } from '../assets/questions';

const theme = createTheme({
  palette: {
    blacky: {
      main: '#222222',
      contrastText: '#fff'
    }
  }
});

const Home = () => {
  const pages = Object.keys(questions);

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h3" gutterBottom my={5} align="center">
            Question packs
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
          {pages.map((page, index) => (
            <Box m={1} key={index}>
              <Link to={`/questions/${page}`}>
                <Card variant="outlined">
                  <Box p={2}>
                    <Typography variant="h3">{page}</Typography>
                  </Box>
                </Card>
              </Link>
            </Box>
          ))}
        </Box>
      </ThemeProvider>
    </Container>
  );
};

export default Home;
