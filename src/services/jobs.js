import axios from 'axios';
const baseUrl = 'api/jobs';

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    };
    console.log(config);
    const request = axios.get(baseUrl, config);
    return request.then((response) => response.data);
};

const create = (newObject) => {
    const config = {
        headers: { Authorization: token },
    };
    const request = axios.post(baseUrl, newObject, config);
    return request.then((response) => response.data);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
};

const remove = (id, newObject) => {
    const request = axios.delete(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
};

const jobServiceObject = {
    getAll,
    create,
    update,
    remove,
    setToken,
};

export default jobServiceObject;
