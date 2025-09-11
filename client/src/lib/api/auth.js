import axios from 'axios';

const API_URL = "https://pom-s-backend.onrender.com/api/auth";

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, { 
      username, 
      password 
    });
    return response.data;
  } catch (error) {
    console.error('[REGISTER] error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error en el registro' };
  }
}

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, { 
      username, 
      password 
    });
    
    // Guardar token en sessionStorage
    if (response.data.access) {
      sessionStorage.setItem('token', response.data.access);
    }
    
    return response.data;
  } catch (error) {
    console.error('[LOGIN] error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error en el login' };
  }
}