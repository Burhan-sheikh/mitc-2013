import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import MobileNav from '@components/layout/MobileNav';
import { useAuth } from '@hooks/useAuth';
import Button from '@components/common/Button';
import { useState } from 'react';

export default function UserSettings() {
  const { currentUser, logout } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    // Simulate deletion for now
    setTimeout(() => {
      setDeleting(false);
      setSuccess(true);
      logout();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="container-custom flex-1 py-12 max-w-lg">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        <div className="glass-card p-8">
          <div className="mb-4"><span className="font-semibold">Account created: </span> {currentUser?.metadata?.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString() : '-'}</div>
          <div className="mb-6"><span className="font-semibold">Last login: </span> {currentUser?.metadata?.lastSignInTime ? new Date(currentUser.metadata.lastSignInTime).toLocaleString() : '-'}</div>
          <div className="pt-2 pb-3 border-t border-gray-200">
            <label className="label">Delete Account</label>
            <div className="mb-2 text-red-600 text-sm">This will delete your account and all your reviews, favorites, and chat data. This action cannot be undone.</div>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="confirmDel" checked={confirmed} onChange={e=>setConfirmed(e.target.checked)} />
              <label htmlFor="confirmDel" className="text-sm">Yes, delete everything</label>
            </div>
            <Button variant="danger" loading={deleting} disabled={!confirmed || success} onClick={handleDelete}>Delete My Account</Button>
            {success && <div className="text-green-600 mt-2">Account deleted. Goodbye!</div>}
          </div>
        </div>
      </main>
      <Footer/>
      <MobileNav/>
    </div>
  );
}
