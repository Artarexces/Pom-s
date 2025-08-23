'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, loginUser } from '@/lib/api/auth';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const router = useRouter();
    const formRef = useRef(null);

    useEffect(() => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
        } catch (e) {
            console.error('[LOGIN] error:', e);
        }


        if (navigator.credentials && navigator.credentials.preventSilentAccess) {
            navigator.credentials.preventSilentAccess().catch(() => {});
        }

        const saved = sessionStorage.getItem('username') || localStorage.getItem('username');
        if (saved) setUsername(saved);
        if (formRef.current) {
            formRef.current.onsubmit = null;
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await registerUser(username, password);
                alert('Usuario registrado correctamente');
            }
            const data = await loginUser(username, password);

            if (data?.access) sessionStorage.setItem('token', data.access);
            if (data?.refresh) sessionStorage.setItem('refresh', data.refresh);
            sessionStorage.setItem('username', username);

            sessionStorage.setItem('manualLogin', '1');

            router.push('/timer');
        } catch (error) {
            console.error('[LOGIN] error:', error);
        }
    };

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            autoComplete="on"
            className="flex flex-col gap-4 p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm text-white"
        >
            <h2 className="text-xl sm:text-2xl font-bold text-center cursor-default">
                {isRegister ? 'Registrarse' : 'Iniciar sesión'}
            </h2>
            <input
                name="username"
                autoComplete="username"
                type="text"
                className="border border-gray-300 rounded p-2 w-full bg-slate-50/60"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                name="password"
                autoComplete="current-password"
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
