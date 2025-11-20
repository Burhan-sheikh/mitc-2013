import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';
import { useAuth } from '@hooks/useAuth';
import { useState } from 'react';
import Button from '@components/common/Button';

export default function AdminUsers() {
  const { users, loading, changeUserRole, deleteUser } = useAuth();
  const [roleChange, setRoleChange] = useState({});
  const handleChangeRole = (uid, role) => {
    setRoleChange(prev=>({...prev,[uid]:role}));
    changeUserRole(uid,role);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="flex flex-1 min-h-0">
        <Sidebar/>
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Users</h1>
          <div className="glass-card overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Last Seen</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="text-center text-gray-400">Loading users…</td></tr>
                ) : users && users.length === 0 ? (
                  <tr><td colSpan={5} className="text-center text-gray-400">No users yet.</td></tr>
                ) : (
                  users.map(user => (
                    <tr key={user.uid} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="py-2 px-4">{user.name}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">
                        <select value={roleChange[user.uid] || user.role} onChange={e=>handleChangeRole(user.uid, e.target.value)} className="input">
                          <option value="guest">Guest</option>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="py-2 px-4">{user.lastSeen ? new Date(user.lastSeen.seconds*1000).toLocaleString() : '-'}</td>
                      <td className="py-2 px-4">
                        <Button size="sm" variant="danger" onClick={()=>{ if(window.confirm('Delete user?')) deleteUser(user.uid); }}>Delete</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
