import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios/axiosInstance';
import PhishingList from '../components/phishing/PhishingList';
import useUserStore from '../store/UserStore';
import { useInterval } from '../hooks/useInterval';

const PhishingPage = () => {
    const { cleanToken } = useUserStore();
    const [email, setEmail] = useState('');
    const [phishingAttempts, setPhishingAttempts] = useState([]);
    const [error, setError] = useState(null); // State for error handling
    const [loading, setLoading] = useState(false); // State for loading status

    const fetchPhishingAttempts = async () => {
        setLoading(true); // Set loading to true when fetching data
        try {
            const response = await axiosInstance.get('/phishing/attempts');
            setPhishingAttempts(response.data);
            setError(null); // Clear error on successful fetch
        } catch (error) {
            setError('Failed to fetch phishing attempts. Please try again later.');
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/phishing/attempt', { employeeEmail: email });
            setEmail('');
            fetchPhishingAttempts();
        } catch (error) {
            setError('Failed to send phishing email. Please try again.');
        }
    };

    useEffect(() => {
        fetchPhishingAttempts();
    }, []);

    useInterval(fetchPhishingAttempts, 10000);

    return (
        <div className="page-wrapper">
            <h1 className="page-title">Send Phishing Email</h1>
            <form className="email-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="email-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">Send</button>
            </form>
            {loading && <p className="loading-message">Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            <PhishingList list={phishingAttempts} />
            <button className="logOut-button" type="button" onClick={cleanToken}>Log out</button>
        </div>
    );
};

export default PhishingPage;
