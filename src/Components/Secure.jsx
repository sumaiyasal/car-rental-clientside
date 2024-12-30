import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import axios from 'axios';
import { AuthContext } from './Authprovide';

const axiosInstance = axios.create({
    baseURL: 'https://car-rental-service-68odqam3g-sumaiya-s-projects-efb56ee6.vercel.app',
    withCredentials: true
});

const Secure = () => {

    const { signout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('api response error status', error.status);
            if (error.status === 401 || error.status === 403) {
                signout()
                    .then(() => {
                        navigate('/signIn')
                    })
                    .catch(err => console.log(err))
            }
            return Promise.reject(error);
        })
    }, [])
    return axiosInstance;
};

export default Secure;