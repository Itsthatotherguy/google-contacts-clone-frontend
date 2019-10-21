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
