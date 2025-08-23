import axios from 'axios';
const API_BASE = "http://localhost:8000/api/auth";

export const authHeaders = () => {
  const token = sessionStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const registerUser = async (username, password) => {
  const response = await axios.post(`${API_BASE}/register/`, { username, password });
  return response.data;
}

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_BASE}/login/`, { username, password });
  return response.data;
}
