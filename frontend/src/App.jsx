import { Route, Routes } from 'react-router-dom';
import { Nagivation } from './routes/Nagivation';
import Home from './routes/Home';
import Category from './routes/Category';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Nagivation />}>
        <Route index element={<Home />} />
        <Route path="/category" element={<Category />} />
      </Route>
    </Routes>
  );
}

export default App;
