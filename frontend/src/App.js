import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Phishing from './pages/Phishing';
import PrivateRoute from './components/shared/PrivateRoute';
import useUserStore from './store/UserStore';


const App = () => {
    const { token } = useUserStore();
    const isAuthenticated = !!token;

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PrivateRoute condition={!isAuthenticated} redirectTo="/phishing">
                            <Login/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PrivateRoute condition={!isAuthenticated} redirectTo="/phishing">
                            <Register/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/phishingList"
                    element={
                        <PrivateRoute condition={isAuthenticated} redirectTo="/login">
                            <Phishing/>
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/phishingList"/>}/>
            </Routes>
        </Router>
    );
};

export default App;
