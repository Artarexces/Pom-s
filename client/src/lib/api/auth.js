import axios from 'axios';
const API_URL = "https://pom-s-backend.onrender.com/api";

export const authHeaders = () => {
  const token = sessionStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, { username, password });
    return response.data;
  } catch (error) {
    console.error('[REGISTER] error:', error);
    throw error;
  }
}

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, { username, password });
    return response.data;
  } catch (error) {
    console.error('[LOGIN] error:', error);
    throw error;
  }
}
