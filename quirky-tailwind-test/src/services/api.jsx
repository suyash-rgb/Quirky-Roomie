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
   
// File a new Complaint
export const logComplaint = (data, token) =>
  api.post('/complaints', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const voteComplaint = async (id, voteType, token) => {
  const url = `${api.defaults.baseURL}/complaints/${id}/vote`;
  console.log(`Calling: ${url}`);
  console.log('Body:', { voteType });
  console.log('Token:', token);

  return api.put(
    `/complaints/${id}/vote`,
    { voteType },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//to resolve a complaint
export const resolveComplaint = (id, token) =>
  api.put(`/complaints/${id}/resolve`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });


// Leaderboard & Stats
export const getLeaderboard = (token) =>
  api.get('/leaderboard', {
    headers: { Authorization: `Bearer ${token}` },
  });
  
export const getFlatStats = (flatCode, token) =>
  api.get(`/flat/stats?flatCode=${flatCode}`, {
    headers: { Authorization: `Bearer ${token}` }
  });