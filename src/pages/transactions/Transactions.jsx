/**
 * Transactions.jsx — Full transaction list (private route: /transactions)
 *
 * Features:
 * • Search bar filters transactions by description
 * • Category dropdown filter
 * • Add Transaction modal (quick add form)
 * • Delete transaction by id
 * • Shows transaction count
 */
import React, { useState, useMemo } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useTransactions } from '../../context/TransactionContext'
import { useToast } from '../../context/ToastContext'
import { Search, Plus, Trash2, TrendingUp, TrendingDown, X } from 'lucide-react'

const CATEGORIES = ['All Categories', 'Shopping', 'Income', 'Entertainment', 'Bills', 'Food', 'Transport']

const Transactions = () => {
  const { transactions, deleteTransaction, addTransaction } = useTransactions()
  const { showToast } = useToast()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [showModal, setShowModal] = useState(false)

  // New transaction form state (inside modal)
  const [newTxn, setNewTxn] = useState({
    description: '', category: 'Shopping', type: 'expense', amount: '', date: new Date().toISOString().split('T')[0]
  })

  // Filter logic: search + category
  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.description.toLowerCase().includes(search.toLowerCase())
      const matchCat    = category === 'All Categories' || t.category === category
      return matchSearch && matchCat
    })
  }, [transactions, search, category])

  const handleDelete = (id) => {
    deleteTransaction(id)
    showToast('Transaction deleted', 'error')
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newTxn.description || !newTxn.amount) return
    addTransaction({
      ...newTxn,
      amount: newTxn.type === 'expense' ? -Math.abs(Number(newTxn.amount)) : Math.abs(Number(newTxn.amount))
    })
    showToast('Transaction added!', 'success')
    setShowModal(false)
    setNewTxn({ description: '', category: 'Shopping', type: 'expense', amount: '', date: new Date().toISOString().split('T')[0] })
  }

  return (
    <DashboardLayout>
      {/* ── Header ─────────────────────────────────────── */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B] dark:text-[#F1F5F9]">Transactions</h1>
          <p className="text-[#64748B] text-sm mt-1">Showing {filtered.length} of {transactions.length} transactions</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Add Transaction
        </button>
      </div>

      {/* ── Filters ────────────────────────────────────── */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-9 py-2 text-sm"
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="input-field py-2 text-sm w-full sm:w-48"
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* ── Table ──────────────────────────────────────── */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F7FB] dark:bg-[#0F172A] border-b border-[#E2E8F0] dark:border-[#334155]">
                {['Date', 'Description', 'Category', 'Type', 'Amount', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} className="border-b border-[#F1F5F9] dark:border-[#334155] hover:bg-[#F5F7FB] dark:hover:bg-[#0F172A] transition-colors">
                  <td className="px-4 py-3 text-[#64748B] whitespace-nowrap">{t.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
                        ${t.type === 'income' ? 'bg-[#22C55E20]' : 'bg-red-50 dark:bg-red-900/20'}`}>
                        {t.type === 'income'
                          ? <TrendingUp size={12} className="text-[#22C55E]" />
                          : <TrendingDown size={12} className="text-red-500" />}
                      </div>
                      <span className="font-medium text-[#1E293B] dark:text-[#F1F5F9]">{t.description}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-[#5B6CFF1A] text-[#5B6CFF] text-xs px-2 py-1 rounded-full">{t.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize
                      ${t.type === 'income' ? 'bg-[#22C55E20] text-[#22C55E]' : 'bg-red-50 dark:bg-red-900/20 text-red-500'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-4 py-3 font-bold whitespace-nowrap ${t.amount > 0 ? 'text-[#22C55E]' : 'text-red-500'}`}>
                    {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(t.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-[#94A3B8] hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-[#64748B] text-sm">No transactions found.</div>
          )}
        </div>
        <div className="px-4 py-3 border-t border-[#E2E8F0] dark:border-[#334155] text-xs text-[#64748B]">
          Showing 1 to {filtered.length} of {filtered.length} entries
        </div>
      </div>

      {/* ── Add Transaction Modal ──────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-[#1E293B] dark:text-[#F1F5F9]">Add Transaction</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A] rounded-lg">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#64748B] mb-1">Description</label>
                <input type="text" placeholder="e.g., Netflix Subscription" required
                  value={newTxn.description}
                  onChange={e => setNewTxn(p => ({ ...p, description: e.target.value }))}
                  className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#64748B] mb-1">Category</label>
                  <select value={newTxn.category} onChange={e => setNewTxn(p => ({ ...p, category: e.target.value }))} className="input-field">
                    {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#64748B] mb-1">Type</label>
                  <select value={newTxn.type} onChange={e => setNewTxn(p => ({ ...p, type: e.target.value }))} className="input-field">
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#64748B] mb-1">Amount (₹)</label>
                  <input type="number" placeholder="0.00" required min="1"
                    value={newTxn.amount}
                    onChange={e => setNewTxn(p => ({ ...p, amount: e.target.value }))}
                    className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#64748B] mb-1">Date</label>
                  <input type="date" value={newTxn.date}
                    onChange={e => setNewTxn(p => ({ ...p, date: e.target.value }))}
                    className="input-field" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline flex-1 py-2.5 text-sm">Cancel</button>
                <button type="submit" className="btn-primary flex-1 py-2.5 text-sm">Add Transaction</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default Transactions
