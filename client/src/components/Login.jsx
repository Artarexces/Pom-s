'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, loginUser } from '@/lib/api/auth';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const router = useRouter(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(isRegister){
                await registerUser(username, password);
                alert('Usuario registrado correctamente');
                }
            const { access } = await loginUser(username, password);
            localStorage.setItem('token', access);
            router.push('/timer');
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <form onSubmit={handleSubmit}>
            <h2>{isRegister ? 'Registrarse' : 'Iniciar sesión'}</h2>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button 
                    type="submit"
                >
                    {isRegister ? 'Registrarse' : 'Iniciar sesión'}
                </button>
            <p
                onClick={() => setIsRegister(!isRegister)}
                >
                {isRegister ? 'Ya tienes cuenta?' : 'No tienes cuenta?'}
            </p>
        </form>
    );

}

