import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import MobileNav from '@components/layout/MobileNav';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { useState } from 'react';
import { db } from '@lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (k, v) => setForm(prev => ({...prev, [k]:v}));
  const handleSubmit = async e => {
    e.preventDefault(); if (sending) return;
    setSending(true); setError('');
    try {
      await addDoc(collection(db, 'leads'), { ...form, createdAt: serverTimestamp(), status:'new', tags:[] });
      setSuccess(true); setForm({ name:'', email:'', phone:'', message:'' });
    } catch {
      setError('Failed to submit, try again');
    } finally { setSending(false); }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="container-custom flex-1 py-12">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <form onSubmit={handleSubmit} className="max-w-xl glass-card space-y-4 p-8">
          <Input label="Name" value={form.name} onChange={e=>handleChange('name',e.target.value)} required/>
          <Input label="Email" type="email" value={form.email} onChange={e=>handleChange('email',e.target.value)} required/>
          <Input label="Phone" value={form.phone} onChange={e=>handleChange('phone',e.target.value)} required/>
          <label className="label">Message</label>
          <textarea required className="input" rows="4" value={form.message} onChange={e=>handleChange('message',e.target.value)}/>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">Thank you! We received your message.</div>}
          <div className="pt-2 flex gap-2 justify-end">
            <Button loading={sending}>Submit</Button>
          </div>
        </form>
      </main>
      <Footer/>
      <MobileNav/>
    </div>
  );
}
