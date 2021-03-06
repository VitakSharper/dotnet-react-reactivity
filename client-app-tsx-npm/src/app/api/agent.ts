import axios, {AxiosResponse} from 'axios';
import {IActivitiesEnvelope, IActivity} from "../models/activity";
import {history} from "../../index";
import {toast} from "react-toastify";
import {IUser, IUserFormValues} from "../models/user";
import {IPhoto, IProfile} from "../models/profile";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => Promise.reject(error));

axios.interceptors.response.use(undefined, err => {
    const {status, data, config, headers} = err.response;

    if (err.message === 'Network Error' && !err.response) {
        toast.error('Network error - make sure API is running!')
    }

    if (status === 404) {
        history.push('/notFound');
    }
    const headersResp = headers['www-authenticate'];

    if (status === 401 && headersResp.toString().includes("Bearer error=\"invalid_token\", error_description=\"The token expired at")) {
        window.localStorage.removeItem('jwt');
        history.push('/');
        toast.info('Your session has expired, please login again.')
    }

    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notFound');
        toast.error(`💥 ${data.errors.id[0]}`);
    }
    if (status === 500) {
        toast.error('Server error - check the terminal for more info!')
    }
    throw err.response;
});

const responseBody = (response: AxiosResponse) => response.data;

// const sleep = (ms: number) => (response: AxiosResponse) => new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));
// const sleep = function (ms: number) {
//     return function (response: AxiosResponse) {
//         return new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms))
//     }
// };

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post(url, formData, {
            headers: {'Content-type': 'multipart/form-data'}
        }).then(responseBody)
    }
};

const Activities = {
    list: (params: URLSearchParams): Promise<IActivitiesEnvelope> =>
        axios.get(`/activities`, {params}).then(responseBody),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/activities/${id}`),
    attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
    unAttend: (id: string) => requests.delete(`/activities/${id}/attend`)
};

const Users = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post('/user/login', user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post('/user/register', user),
};

const Profiles = {
    get: (username: string): Promise<IProfile> => requests.get(`/profile/${username}`),
    edit: (profileData: Partial<IProfile>) => requests.put(`/profile`, profileData),
    uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos`, photo),
    deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
    setStatusPhoto: (id: string) => requests.post(`/photos/${id}/status`, {}),
    follow: (username: string) => requests.post(`/profile/${username}/follow`, {}),
    unFollow: (username: string) => requests.delete(`/profile/${username}/follow`),
    listFollowings: (username: string, are: string) => requests.get(`/profile/${username}/follow?are=${are}`),
    listUserActivities: (username: string, predicate: string) => requests.get(`/profile/${username}/activities?predicate=${predicate}`)
};

export {Activities, Users, Profiles};

