import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { useState } from 'react';

export default function AdminSettings() {
  const [cloudinary, setCloudinary] = useState({cloudName:'',apiKey:'',apiSecret:'', enabled:true});
  const [info, setInfo] = useState({ storeName:'MITC Store', address:'Maisuma, Srinagar', phone:'', email:'', map:'' });
  const handleInput = (group,key,v) => { group==='cloudinary' ? setCloudinary(prev=>({...prev,[key]:v})) : setInfo(prev=>({...prev,[key]:v})); };
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="flex flex-1 min-h-0">
        <Sidebar/>
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-3">Cloudinary Integration</h2>
              <Input label="Cloud Name" value={cloudinary.cloudName} onChange={e=>handleInput('cloudinary','cloudName',e.target.value)}/>
              <Input label="API Key" value={cloudinary.apiKey} onChange={e=>handleInput('cloudinary','apiKey',e.target.value)}/>
              <Input label="API Secret" value={cloudinary.apiSecret} onChange={e=>handleInput('cloudinary','apiSecret',e.target.value)}/>
              <Button className="mt-3">Test & Save</Button>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-3">Business Info</h2>
              <Input label="Store Name" value={info.storeName} onChange={e=>handleInput('info','storeName',e.target.value)}/>
              <Input label="Address" value={info.address} onChange={e=>handleInput('info','address',e.target.value)}/>
              <Input label="Phone" value={info.phone} onChange={e=>handleInput('info','phone',e.target.value)}/>
              <Input label="Email" value={info.email} onChange={e=>handleInput('info','email',e.target.value)}/>
              <Input label="Google Map Link" value={info.map} onChange={e=>handleInput('info','map',e.target.value)}/>
              <Button className="mt-3">Save Business Info</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
