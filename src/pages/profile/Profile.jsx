/**
 * Profile.jsx — User profile page (private route: /profile)
 *
 * Tabs:
 * • Edit Profile — update name, email, phone
 * • Change Password — old + new password form
 * • Security — 2FA toggle, session info
 */
import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { User, Lock, Shield, Save, Camera } from 'lucide-react'

const TABS = [
  { id: 'profile',  label: 'Edit Profile',    icon: User  },
  { id: 'password', label: 'Change Password', icon: Lock  },
  { id: 'security', label: 'Security',        icon: Shield},
]

const Profile = () => {
  const { user, login } = useAuth()
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState('profile')

  const [profile, setProfile] = useState({
    name:   user?.name  || '',
    email:  user?.email || '',
    phone:  '+91 98765 43210',
    member: 'May 2024',
  })
  const [passwords, setPasswords] = useState({ current: '', newPw: '', confirm: '' })
  const [twoFA, setTwoFA] = useState(false)

  const handleSaveProfile = (e) => {
    e.preventDefault()
    login({ ...user, name: profile.name, email: profile.email })
    showToast('Profile updated successfully!', 'success')
  }

  const handleSavePassword = (e) => {
    e.preventDefault()
    if (passwords.newPw !== passwords.confirm) { showToast('Passwords do not match', 'error'); return }
    showToast('Password changed!', 'success')
    setPasswords({ current: '', newPw: '', confirm: '' })
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1E293B] dark:text-[#F1F5F9]">Profile</h1>
        <p className="text-[#64748B] text-sm mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Avatar card */}
        <div className="card text-center lg:col-span-1 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#5B6CFF] to-[#8B9DFF] flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#5B6CFF] rounded-full flex items-center justify-center shadow-lg">
              <Camera size={12} className="text-white" />
            </button>
          </div>
          <h3 className="font-bold text-[#1E293B] dark:text-[#F1F5F9]">{user?.name}</h3>
          <p className="text-xs text-[#64748B] mt-0.5">Premium User</p>
          <div className="w-full mt-5 space-y-3 text-left">
            {[
              { label: 'Email',  value: user?.email },
              { label: 'Phone',  value: '+91 98765 43210' },
              { label: 'Member', value: 'May 2024' },
            ].map(({ label, value }) => (
              <div key={label} className="border-b border-[#F1F5F9] dark:border-[#334155] pb-2">
                <p className="text-[10px] text-[#64748B] uppercase">{label}</p>
                <p className="text-xs font-medium text-[#1E293B] dark:text-[#F1F5F9] mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs + forms */}
        <div className="lg:col-span-3">
          <div className="flex gap-1 bg-white dark:bg-[#1E293B] rounded-xl p-1 border border-[#E2E8F0] dark:border-[#334155] mb-5 w-fit">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${activeTab === id ? 'bg-[#5B6CFF] text-white' : 'text-[#64748B] hover:text-[#5B6CFF]'}`}>
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>

          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="font-bold text-[#1E293B] dark:text-[#F1F5F9] mb-5">Personal Information</h2>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] mb-1">Full Name</label>
                    <input type="text" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] mb-1">Email</label>
                    <input type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] mb-1">Phone</label>
                    <input type="tel" value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] mb-1">Member Since</label>
                    <input type="text" value={profile.member} readOnly className="input-field opacity-60 cursor-not-allowed" />
                  </div>
                </div>
                <button type="submit" className="btn-primary flex items-center gap-2 text-sm">
                  <Save size={14} /> Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="card">
              <h2 className="font-bold text-[#1E293B] dark:text-[#F1F5F9] mb-5">Change Password</h2>
              <form onSubmit={handleSavePassword} className="space-y-4 max-w-sm">
                {[['Current Password','current'],['New Password','newPw'],['Confirm Password','confirm']].map(([lbl, key]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-[#64748B] mb-1">{lbl}</label>
                    <input type="password" placeholder="••••••••" value={passwords[key]}
                      onChange={e => setPasswords(p => ({ ...p, [key]: e.target.value }))} className="input-field" />
                  </div>
                ))}
                <button type="submit" className="btn-primary flex items-center gap-2 text-sm">
                  <Lock size={14} /> Update Password
                </button>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card space-y-4">
              <h2 className="font-bold text-[#1E293B] dark:text-[#F1F5F9]">Security Settings</h2>
              <div className="flex items-center justify-between p-4 bg-[#F5F7FB] dark:bg-[#0F172A] rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-[#1E293B] dark:text-[#F1F5F9]">Two-Factor Authentication</p>
                  <p className="text-xs text-[#64748B]">Add an extra layer of security</p>
                </div>
                <button onClick={() => { setTwoFA(!twoFA); showToast(`2FA ${!twoFA ? 'enabled' : 'disabled'}`, 'info') }}
                  className={`relative w-12 h-6 rounded-full transition-colors ${twoFA ? 'bg-[#22C55E]' : 'bg-[#E2E8F0]'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${twoFA ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              <div className="p-4 bg-[#F5F7FB] dark:bg-[#0F172A] rounded-xl">
                <p className="text-sm font-semibold text-[#1E293B] dark:text-[#F1F5F9] mb-3">Active Sessions</p>
                {[
                  { device: 'Chrome — Windows', location: 'Mumbai, IN', time: 'Active now', current: true },
                  { device: 'Safari — iPhone',  location: 'Mumbai, IN', time: '2 hours ago', current: false },
                ].map(({ device, location, time, current }) => (
                  <div key={device} className="flex items-center justify-between py-2 border-b border-[#E2E8F0] dark:border-[#334155] last:border-0">
                    <div>
                      <p className="text-xs font-medium text-[#1E293B] dark:text-[#F1F5F9]">{device}</p>
                      <p className="text-[10px] text-[#64748B]">{location} • {time}</p>
                    </div>
                    {current
                      ? <span className="text-[10px] bg-[#22C55E20] text-[#22C55E] px-2 py-0.5 rounded-full">Current</span>
                      : <button className="text-[10px] text-red-500 hover:underline">Revoke</button>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Profile
