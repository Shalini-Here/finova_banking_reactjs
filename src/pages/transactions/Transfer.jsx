/**
 * Transfer.jsx — Send money page (private route: /transfer)
 *
 * Features:
 * • Beneficiary selector (dropdown)
 * • Amount input with validation
 * • Optional note field
 * • On submit: adds a new transaction via TransactionContext
 * • Recent transfers list (last 3)
 */
import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useTransactions } from '../../context/TransactionContext'
import { useToast } from '../../context/ToastContext'
import { Send, CheckCircle } from 'lucide-react'

// Mock beneficiaries
const BENEFICIARIES = [
  { id: 1, name: 'Rahul Sharma',  account: 'XXXX 4521' },
  { id: 2, name: 'Priya Patel',   account: 'XXXX 7832' },
  { id: 3, name: 'Amit Kumar',    account: 'XXXX 2190' },
  { id: 4, name: 'Sunita Verma',  account: 'XXXX 5674' },
]

const Transfer = () => {
  const { addTransaction, transactions } = useTransactions()
  const { showToast } = useToast()

  const [form, setForm] = useState({ beneficiary: '', amount: '', note: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.beneficiary)             e.beneficiary = 'Please select a beneficiary'
    if (!form.amount || Number(form.amount) <= 0) e.amount = 'Enter a valid amount'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000)) // simulate network

    const ben = BENEFICIARIES.find(b => b.id === Number(form.beneficiary))
    addTransaction({
      description: `Transfer to ${ben.name}`,
      category: 'Transfer',
      type: 'expense',
      amount: -Math.abs(Number(form.amount)),
      date: new Date().toISOString().split('T')[0],
    })
    showToast(`₹${Number(form.amount).toLocaleString()} sent to ${ben.name}!`, 'success')
    setSuccess(true)
    setLoading(false)
    setForm({ beneficiary: '', amount: '', note: '' })
    setTimeout(() => setSuccess(false), 3000)
  }

  // Show last 3 expense transactions as "recent transfers"
  const recentTransfers = transactions.filter(t => t.type === 'expense').slice(0, 3)

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1E293B] dark:text-[#F1F5F9]">Transfer Money</h1>
        <p className="text-[#64748B] text-sm mt-1">Send money securely to any beneficiary.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* ── Transfer Form ─────────────────────────────── */}
        <div className="card">
          <h2 className="font-bold text-[#1E293B] dark:text-[#F1F5F9] mb-5">Send Money</h2>

          {success && (
            <div className="flex items-center gap-2 bg-[#22C55E20] text-[#22C55E] rounded-xl px-4 py-3 mb-5 text-sm font-medium">
              <CheckCircle size={16} /> Transfer successful!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Beneficiary */}
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">Select Beneficiary</label>
              <select
                value={form.beneficiary}
                onChange={e => { setForm(p => ({ ...p, beneficiary: e.target.value })); setErrors(p => ({ ...p, beneficiary: undefined })) }}
                className={`input-field ${errors.beneficiary ? 'ring-2 ring-red-400' : ''}`}
              >
                <option value="">-- Select Beneficiary --</option>
                {BENEFICIARIES.map(b => (
                  <option key={b.id} value={b.id}>{b.name} ({b.account})</option>
                ))}
              </select>
              {errors.beneficiary && <p className="text-red-500 text-xs mt-1">{errors.beneficiary}</p>}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">Amount (₹)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium text-sm">₹</span>
                <input type="number" placeholder="0.00" min="1"
                  value={form.amount}
                  onChange={e => { setForm(p => ({ ...p, amount: e.target.value })); setErrors(p => ({ ...p, amount: undefined })) }}
                  className={`input-field pl-8 ${errors.amount ? 'ring-2 ring-red-400' : ''}`} />
              </div>
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
              {/* Quick amount chips */}
              <div className="flex gap-2 mt-2">
                {[500, 1000, 5000, 10000].map(a => (
                  <button key={a} type="button"
                    onClick={() => setForm(p => ({ ...p, amount: String(a) }))}
                    className="text-xs px-3 py-1 rounded-full border border-[#E2E8F0] dark:border-[#334155] text-[#64748B] hover:border-[#5B6CFF] hover:text-[#5B6CFF] transition-colors">
                    ₹{a.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">Add Note (Optional)</label>
              <input type="text" placeholder="e.g., Rent Payment"
                value={form.note}
                onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
                className="input-field" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><Send size={16} /> Send Money</>
              }
            </button>

            <p className="text-center text-[10px] text-[#64748B]">🔒 All transfers are secure and encrypted</p>
          </form>
        </div>

        {/* ── Recent Transfers ──────────────────────────── */}
        <div className="card">
          <h2 className="font-bold text-[#1E293B] dark:text-[#F1F5F9] mb-5">Recent Transfers</h2>
          <div className="space-y-3">
            {recentTransfers.map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-[#F5F7FB] dark:bg-[#0F172A] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#5B6CFF1A] rounded-full flex items-center justify-center text-[#5B6CFF] font-bold text-sm">
                    {t.description.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1E293B] dark:text-[#F1F5F9]">{t.description}</p>
                    <p className="text-xs text-[#64748B]">{t.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-500">-₹{Math.abs(t.amount).toLocaleString()}</p>
                  <span className="text-[10px] bg-[#22C55E20] text-[#22C55E] px-2 py-0.5 rounded-full">Success</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Transfer
