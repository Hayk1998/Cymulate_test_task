import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';
import useUserStore from '../../store/UserStore';


const Login = () => {
    const { setToken } = useUserStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            setToken(response.data.token);
        } catch (error) {
            setError(error?.response?.data?.error || 'Unknown error');
        }
    };

    return (
        <div className="page-wrapper">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <span className="error-msg">{error}</span>
                <button type="submit">Login</button>
            </form>
            <span>Don't have an account? <Link to="/signup">Signup here</Link></span>
        </div>
    );
};

export default Login;
