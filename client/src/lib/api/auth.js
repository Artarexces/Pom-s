import axios from "axios";

const API_BASE = "http://localhost:8000/api/auth";

export const authHeaders = () => {
    const token = sessionStorage.getItem('token');
    return token ?  {
            Authorization: `Bearer ${token}`
        } : {};
}


export const registerUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE}/register/`, { username, password });
        return response.data;
    } catch (err) {
        if (err.response?.status === 400) {
            throw new Error('El usuario ya existe'), Error("Error al registrar usuario");
        } else {
            throw new Error("Error al registrar usuario"), Error ("Error al iniciar sesión");
        }
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE}/login/`, { username, password });
        return response.data;
    } catch (err) {
        if (err.response?.status === 401) {
            throw new Error('Credenciales incorrectas'), Error("Error al iniciar sesión");
        } else {
            throw new Error("Error al iniciar sesión"), Error("Error al iniciar sesión");
        }
    }
};


