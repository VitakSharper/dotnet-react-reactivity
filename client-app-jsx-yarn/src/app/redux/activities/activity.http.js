import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api/activities';

const responseBody = (response) => response.data;

// const sleep = function (ms) {
//     return function (response) {
//         return new Promise(resolve => setTimeout(() => resolve(response), ms))
//     }
// };

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody)
};

const httpActivities = {
    list: () => requests.get('/'),
    details: (id) => requests.get(`/${id}`),
    create: (activity) => requests.post('/', activity),
    update: (activity) => requests.put(`/${activity.id}`, activity),
    delete: (id) => requests.delete(`/${id}`)
};

export default httpActivities;
