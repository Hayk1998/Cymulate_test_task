import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';
import useUserStore from '../../store/UserStore';


const Register = () => {
    const { setToken } = useUserStore();

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/register', { email, password, fullName });
            setToken(response.data.token);
        } catch (error) {
            setError(error?.response?.data?.error || 'Unknown error');
        }
    };

    return (
        <div className="page-wrapper">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="fullName"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
                <button type="submit">Signup</button>
            </form>
            <span>Already have an account? <Link to="/signin">SignIn here</Link></span>
        </div>
    );
};

export default Register;
