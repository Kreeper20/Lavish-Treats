import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import { supabase } from "../../../src/supabase";
import { Orders } from '../../components/context/adminPage';

export const Route = createFileRoute('/admin/login')({
    component: Login,
})

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError("");
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) return setError(error.message);
        setUser(data.user ?? null);

    };
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setUser(data.session.user);
            }
        };
        checkSession();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            {!user ? (
                <form className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                                {error && <p className="text-red-500 mt-4">{error}</p>}

                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Username"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-purple-deep hover:bg-purple-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
                        type="button"
                        onClick={handleLogin}
                    >
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                </div>
            </form>
            ) : (
                <Orders />
            )}
        </div>
    )
}
