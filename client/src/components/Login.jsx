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

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-blue-50/50 p-6 rounded-lg shadow-md w-80' >
            <h2 className='text-2xl font-bold text-center cursor-default'>{isRegister ? 'Registrarse' : 'Iniciar sesión'}</h2>
                <input 
                    type="text" 
                    className='border border-gray-300 rounded p-2'
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="password" 
                    className='border border-gray-300 rounded p-2'
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button 
                    type="submit"
                    className='cursor-pointer text-center text-white bg-blue-500 hover:bg-blue-600 p-2 rounded'
                >
                    {isRegister ? 'Registrarse' : 'Iniciar sesión'}
                </button>
            <p
                onClick={() => setIsRegister(!isRegister)}
                className="cursor-pointer text-center text-sm text-blue-500 hover:text-blue-600"
                >
                {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
            </p>
        </form>
    );

}

