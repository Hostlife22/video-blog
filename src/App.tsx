import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app';
import './App.css';
import { selectAccessToken } from './features/auth/auth.selectors';
import { fetchUser } from './features/auth/authSlice';
import { Home, Login } from './pages';

function App() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAccessToken);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    if (!accessToken) {
      navigate('/login', { replace: true });
    }
  }, [accessToken]);
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
