import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../store/auth';
import api from '../utils/api';

export default function Login() {
  const nav = useNavigate();
  const { setAuth } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      setAuth(data.token, data.user);
      nav('/');
    } catch (e) {
      setError(e?.response?.data?.error || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <form onSubmit={submit} className="glass p-6 rounded-3xl w-full max-w-md flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-center">Couples Task Manager 💖</h1>
        {error && <div className="px-3 py-2 bg-red-100 rounded-xl text-sm">{error}</div>}
        <input className="px-3 py-2 rounded-xl" placeholder="Email" type="email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} required />
        <input className="px-3 py-2 rounded-xl" placeholder="Password" type="password" value={form.password} onChange={e=>setForm(f=>({...f, password:e.target.value}))} required />
        <button className="px-3 py-2 rounded-xl bg-white">Login</button>
        <div className="text-sm text-center opacity-70">No account? <Link className="underline" to="/signup">Sign up</Link></div>
      </form>
    </div>
  );
}
