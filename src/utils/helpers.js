import axios from 'axios';

export const setAuthorizationHeader = token => {
    return new Promise((resolve, reject) => {
        try {
            const FBIdToken = `Bearer ${token}`;
            localStorage.setItem('FBIdToken', FBIdToken);
            axios.defaults.headers.common['Authorization'] = FBIdToken;
            console.log('Authorization header set');
            resolve();
        } catch (err) {
            reject(err);
        }
    });
};

export const getUserData = () => {
    return axios.get('/user');
};
