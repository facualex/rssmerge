import axios from 'axios';

const baseURL = "http://localhost:8000/api";
const AxiosInstance = axios.create({ baseURL, headers: {
    'Accept': "application/json",
    'Content-Type': "application/json",
}});

const API = {};

AxiosInstance.interceptors.request.use(
    async config => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers = { 'Authorization': `Bearer ${token}`,}
        }
        
        return config;
    },
    error => {
      Promise.reject(error)
  });

AxiosInstance.interceptors.response.use((response) => {
    const { data } = response;

    return data;
}, (error) => {
    return Promise.reject(error.message);
})

// AUTH
API.register = async (registrationData) => await AxiosInstance.post("/register", registrationData);
API.login = async (loginData) => await AxiosInstance.post("/login", loginData); 
API.logout = async () => await AxiosInstance.post('/logout');

// FEED MIX
API.listFeedMixes = async () => await AxiosInstance.get('/feedmix');
API.getFeedMix = async (id) => await AxiosInstance.get(`/feedmix/${id}`);
API.createFeedMix = async (feedMix) => await AxiosInstance.post('/feedmix', feedMix);
API.updateFeedMix = async ({ id, updatePayload}) => await AxiosInstance.put(`/feedmix/${id}`, updatePayload);
API.deleteFeedMix = async (id) => await AxiosInstance.delete(`/feedmix/${id}`);

// FEED
API.listFeeds = async () => await AxiosInstance.get('/feed');
API.getFeed = async (id) => await AxiosInstance.get(`/feed/${id}`);
API.createFeed = async (feedMix) => await AxiosInstance.post('/feed', feedMix);
API.updateFeed = async ({ id, updatePayload}) => await AxiosInstance.put(`/feed/${id}`, updatePayload);
API.deleteFeed = async (id) => await AxiosInstance.delete(`/feed/${id}`);

export default API;