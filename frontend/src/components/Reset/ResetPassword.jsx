// ResetPassword.jsx

import  { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get('id');
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  // Check for userId and token
  if (!userId || !token) {
    navigate('/login'); // Redirect to login if userId or token is missing
    return null; // Render nothing or a loading spinner while redirecting
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New Password and Confirm Password do not match!');
      return;
    }

    try {
      const url = `http://localhost:3000/api/resetPassword`;
      const res = await axios.post(url, {
        userId: userId,
        token: token,
        password: newPassword,
      });

      if (res.data.success) {
        setMessage(res.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Failed to reset password. Please try again later.');
    }
  };

  return (
    <div className={styles.flex}>
      <div className={styles.container}>
        <h1 className={styles.head}>Reset Password</h1>
        <p className={styles.para}>Enter your new password and confirm it to reset your account password</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.btn}>
            <span className={styles.btntext}>Reset Password</span>
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
