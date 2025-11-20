import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import MobileNav from '@components/layout/MobileNav';
import { useAuth } from '@hooks/useAuth';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { useState } from 'react';

export default function Profile() {
  const { currentUser, updateUserProfile } = useAuth();
  const [form, setForm] = useState({ displayName: currentUser?.displayName || '', phone: currentUser?.phone || '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (k,v) => setForm(prev => ({...prev,[k]:v}));
  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      await updateUserProfile(form);
      setSuccess('Profile updated successfully!');
    } finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="container-custom flex-1 py-12">
        <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
        <form className="max-w-lg glass-card p-8 space-y-4" onSubmit={handleSubmit}>
          <Input label="Name" value={form.displayName} onChange={e=>handleChange('displayName', e.target.value)} />
          <Input label="Phone" value={form.phone} onChange={e=>handleChange('phone', e.target.value)} />
          <Input label="Email" value={currentUser.email} readOnly disabled/>
          <Button loading={loading}>Update Profile</Button>
          {success && <div className="text-green-500 mt-1">{success}</div>}
        </form>
      </main>
      <Footer/>
      <MobileNav/>
    </div>
  );
}
