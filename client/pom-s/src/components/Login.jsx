'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, loginUser } from '@/lib/api/auth';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); 
    const [isRegister, setIsRegister] = useState(false);

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
        <div>
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
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
                    {isRegister ? 'Register' : 'Login'}
                </button>
            </form>
            <p
                onClick={() => setIsRegister(!isRegister)}
            >
                {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}
            </p>
        </div>
    );

}

