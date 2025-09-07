'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from '@/components/Login';

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/timer');
        }
    }, []);
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900">
            <Login />
        </main>
    );
}