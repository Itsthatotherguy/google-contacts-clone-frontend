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

export const isObjectEmpty = object => {
    let isEmpty = true;
    Object.keys(object).forEach(key => {
        if (object[key].length > 0) isEmpty = false;
    });

    return isEmpty;
};

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const stringToHslColour = (str, saturation, light) => {
    if (!str) return;

    let hash = 0;
    for (let index = 0; index < str.length; index++) {
        hash = str.charCodeAt(index) + ((hash << 5) - hash);
    }

    const h = hash % 360;

    return `hsl(${h}, ${saturation}%, ${light}%)`;
};

export const getAvatarLetters = name => {
    if (!name) return;
    const [firstName, lastName] = name.split(' ');

    if (lastName) {
        return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    } else {
        return firstName.charAt(0).toUpperCase();
    }
};
