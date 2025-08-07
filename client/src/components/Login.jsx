'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, loginUser } from '@/lib/api/auth';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            router.push('/timer');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await registerUser(username, password);
                alert('Usuario registrado correctamente');
            }
            const { access } = await loginUser(username, password);
            localStorage.setItem('token', access);
            localStorage.setItem('username', username);
            router.push('/timer');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm text-white"
            >
            <h2 className="text-xl sm:text-2xl font-bold text-center cursor-default">
                {isRegister ? 'Registrarse' : 'Iniciar sesión'}
            </h2>
            <input
                type="text"
                className="border border-gray-300 rounded p-2 w-full bg-slate-50/60"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                className="border border-gray-300 rounded p-2 w-full bg-slate-50/60"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="w-full cursor-pointer text-center text-white bg-blue-500 hover:bg-blue-600 p-2 rounded transition-all duration-300"
            >
                {isRegister ? 'Registrarse' : 'Iniciar sesión'}
            </button>
            <p
                onClick={() => setIsRegister(!isRegister)}
                className="cursor-pointer text-center text-sm text-gray-200 hover:text-gray-100 transition-all duration-300"
            >
                {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
            </p>
        </form>
    );

}

