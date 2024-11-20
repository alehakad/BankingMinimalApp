import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


// get user data once
const useAuth = () => {

    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('jwtToken');
            try {

                const response = await axios.get('http://localhost:5000/user/home', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response && response.data && response.data.user) {
                    setUserData(response.data.user);
                } else {
                    console.error("User data is missing or invalid");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching user data or token validation:", error);
                navigate("/login");
            }
        }
        fetchUserData();
    }, [navigate]);

    return userData;
}

export default useAuth;
