import { useState, useEffect } from "react";
import api from "../utils/axiosClient";
import { useNavigate, useLocation } from "react-router-dom";


// get user data once
const useAuth = () => {

    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('jwtToken');
            console.log(token);
            try {

                const response = await api.get('/me/home', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response && response.data && response.data.user) {
                    setUserData(response.data.user);
                    if (location.pathname === '/login' || location.pathname === '/register') {
                        navigate('/')
                    }
                } else {
                    console.error("User data is missing or invalid");
                    handleRedirection();
                }
            } catch (error) {
                console.error("Error fetching user data or token validation:", error);
                handleRedirection();
            }
        };

        const handleRedirection = () => {
            if (location.pathname !== '/login' && location.pathname !== '/register') {
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate, location.pathname]);

    return userData;
}

export default useAuth;
