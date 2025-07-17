import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Auth
export const register = (signupData) => {
  return api.post('/auth/register', signupData);
};

export const login = (loginData) => {
  return api.post('/auth/login', loginData);
};

// Complaints
export const getComplaints = () => api.get('/complaints');
export const logComplaint = data => api.post('/complaints', data);
export const voteComplaint = (id, type) => api.put(`/complaints/${id}/vote`, { voteType: type });

// Leaderboard & Stats
export const getLeaderboard = () => api.get('/leaderboard');
export const getFlatStats = (flatCode) => api.get(`/flat/stats?flatCode=${flatCode}`);