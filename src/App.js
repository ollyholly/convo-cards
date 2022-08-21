import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Questions from './pages/Questions';

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/questions/:id" element={<Questions />} />
      {/* <Route exact path="/questions" element={<Questions />} /> */}
      <Route path="*" element={<h1>404 not found</h1>} />
    </Routes>
  );
};

export default App;
