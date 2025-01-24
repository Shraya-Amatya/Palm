
import React, { useState } from 'react';
import axios from 'axios';
import styles from './index.module.scss';
import Grass from '../Grass/Grass';

const Register = () => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setSuccess('');
        return;
      }

      const response = await axios.post('http://localhost:3000/auth/register', {
       username,
        phone,
        email,
        location,
        password,
        passwordConfirm: confirmPassword
      });

      console.log(response.data); // Handle success response (e.g., redirect, state update)
      setError('');
      setSuccess('User registered successfully');
    } catch (error) {
      console.error('Error Registering:', error.response?.data);
      setError(error.response?.data?.message || 'Internal Server Error');
      setSuccess('');
    }
  };

  return (
    <>
      <Grass />
      <div className={styles.container}>
        <h1 className={styles.head}>Register to Royal Palm</h1>
        <p className={styles.para}>We make it easy for everyone to invest in real estate.</p>
        <form className={styles.form} onSubmit={handleRegister}>
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          <button className={styles.btn} type="submit"><span className={styles.txt}>Sign Up</span></button>
        </form>
      </div>
    </>
  );
};

export default Register;
