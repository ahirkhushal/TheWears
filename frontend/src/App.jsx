import { Route, Routes } from 'react-router-dom';
import { Nagivation } from './routes/Nagivation';
import Home from './routes/Home';
import Category from './routes/Category';
import Login from './routes/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Nagivation />}>
        <Route index element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
