import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home, Login } from './pages';

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
