import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/LoginPage/LoginPage';
import ForgetPass from './Pages/ForgetPass/ForgetPass';
import Register from './components/Register/Register';
import ResetPass from './components/Reset/ResetPassword'
const App = () => {
  
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot" element={<ForgetPass />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword" element={<ResetPass />} />
        <Route path="*" element={<p>404 Error - Nothing here...</p>}/>
        </Routes>
    </BrowserRouter>
  );
};

export default App;
