import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import MobileNav from '@components/layout/MobileNav';
import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import Button from '@components/common/Button';
import Input from '@components/common/Input';

export default function Auth() {
  const { signup, login, loginWithGoogle } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ email:'', password:'', name:'' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const switchForm = () => { setIsSignUp(v=>!v); setForm({ email:'', password:'', name:'' }); setError(''); };
  const handleChange = (k,v) => setForm(prev => ({ ...prev, [k]:v }));
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if(isSignUp) await signup(form.email, form.password, form.name);
      else await login(form.email, form.password);
    } catch(err) { setError('Authentication failed'); }
    setLoading(false);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="container-custom flex-1 py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-md glass-card p-8">
          <h1 className="text-2xl font-bold mb-6">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && <Input label="Name" value={form.name} onChange={(e) => handleChange('name',e.target.value)} required/>}
            <Input label="Email" type="email" value={form.email} onChange={e=>handleChange('email',e.target.value)} required />
            <Input label="Password" type="password" value={form.password} onChange={e=>handleChange('password',e.target.value)} required />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" loading={loading} fullWidth>{isSignUp ? 'Sign Up' : 'Login'}</Button>
          </form>
          <div className="flex flex-col gap-2 mt-6">
            <button onClick={loginWithGoogle} className="btn btn-secondary w-full">Continue with Google</button>
            <button className="btn btn-ghost w-full" onClick={switchForm}>{isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}</button>
          </div>
        </div>
      </main>
      <Footer/>
      <MobileNav/>
    </div>
  );
}
