import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL?.trim();

export const registerUser = async (username, password) => {
  try {
    const cleanUrl = `${API_URL}/register`.replace(/\s+/g, '');
    const response = await axios.post(cleanUrl, { 
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
    const cleanUrl = `${API_URL}/login`.replace(/\s+/g, '');
    const response = await axios.post(cleanUrl, { 
      username, 
      password 
    });
    
    if (response.data.access) {
      sessionStorage.setItem('token', response.data.access);
    }
    return response.data;
  } catch (error) {
    console.error('[LOGIN] error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error en el login' };
  }
}