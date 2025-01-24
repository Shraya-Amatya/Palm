import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { gapi } from 'gapi-script';
import styles from './index.module.scss'; 
import Glogin from './../Glogin/login';

const clientId = "469569277949-d2pgq48oe8juuh2gkbiotmf5t05fc84g.apps.googleusercontent.com"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            });
        }
        gapi.load("client:auth2", start);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('http://localhost:3000/auth/login', { email, password });
            console.log('Response:', response.data); // Log the response for debugging

            setError('');
            setSuccess('User logged in successfully');
            // Optionally, navigate to another page or update the state
        } catch (error) {
            console.error('Error Logging in:', error.response?.data);
            setError(error.response?.data?.message || 'Internal Server Error');
            setSuccess('');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.headings}>
                <h1 className={styles.head}>Welcome to Royal Palm</h1>
                <p className={styles.para}>We make it easy for everyone to invest in real estate.</p>
            </div>
            <form onSubmit={handleLogin}>
                <div className={styles.form}>
                    <input
                        className={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        required
                    />
                    <input
                        className={styles.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <div className={styles.rememberForgot}>
                        <label className={styles.rememberMe}>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <a href="/forgot" className={styles.forgotPassword}>
                            Forgot password?
                        </a>
                    </div>
                    <button className={styles.btn} type="submit">
                        Log in
                    </button>
                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}
                    <div className={styles.google}>
                        <span className={styles.text}>Or Sign in with</span>
                        <Glogin />
                    </div>
                    <div className={styles.signup}>
                        Don’t have an account? <a href='/register' className={styles.signup1}>Sign Up</a>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
