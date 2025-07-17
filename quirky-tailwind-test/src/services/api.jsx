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
export const getComplaints = (token) =>
  api.get('/complaints', {
    headers: { Authorization: `Bearer ${token}` },
  });
  
export const logComplaint = (data, token) =>
  api.post('/complaints/resolve', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const voteComplaint = (id, type, token) =>
  api.post(`/complaints/${id}/vote`, { type }, {
    headers: { Authorization: `Bearer ${token}` },
  });


// Leaderboard & Stats
export const getLeaderboard = (token) =>
  api.get('/leaderboard', {
    headers: { Authorization: `Bearer ${token}` },
  });
  
export const getFlatStats = (flatCode, token) =>
  api.get(`/stats/${flatCode}`, {
    headers: { Authorization: `Bearer ${token}` },
  });