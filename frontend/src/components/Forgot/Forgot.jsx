// components/Forgot.jsx

import { useState } from 'react';
import axios from 'axios';
import styles from './index.module.scss';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/forgot', { email });
      setMessage(response.data.message); // Assuming the response object has a 'message' field
    } catch (error) {
      console.error('Error sending forgot password request:', error.response.data);
      setMessage('Failed to send password reset email');
    }
  };

  return (
    <div className={styles.flex}>
      <div className={styles.container}>
        <h1 className={styles.head}>Forgot Password?</h1>
        <p className={styles.para}>Enter the email address associated with your account and we’ll send you a link to reset your password</p>
        <form className={styles.form} onSubmit={handleForgotPassword}>
          <input
            className={styles.input}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={styles.btn}>
            <span className={styles.btntext}>Continue</span>
          </button>
        </form>
        {message && <p>{message}</p>}
        <p>
          <span className={styles.signup}>Don’t have an account?</span>
          <a href="/register" className={styles.signtext}>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Forgot;
