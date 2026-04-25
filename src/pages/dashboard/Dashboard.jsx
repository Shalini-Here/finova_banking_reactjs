/**
 * Dashboard.jsx — Main dashboard page (private route: /dashboard)
 *
 * Sections:
 * 1. Header greeting + date
 * 2. Stats cards (Total Balance, Income, Expenses, Savings)
 * 3. Balance Overview chart (area chart via Recharts)
 * 4. Expense Breakdown (pie chart via Recharts)
 * 5. Recent Transactions (last 4)
 * 6. Quick Actions (Send, Add, Pay Bills, Analytics)
 */
import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { useTransactions } from '../../context/TransactionContext'
import { Link } from 'react-router-dom'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { Send, PlusCircle, FileText, BarChart2, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'

// Mock data for the balance area chart (last 5 days)
const BALANCE_DATA = [
  { name: '1 May',  balance: 95000 },
  { name: '8 May',  balance: 102000 },
  { name: '15 May', balance: 98000 },
  { name: '22 May', balance: 115000 },
  { name: '29 May', balance: 125000 },
]

// Expense category breakdown for pie chart
const EXPENSE_DATA = [
  { name: 'Shopping',    value: 40, color: '#5B6CFF' },
  { name: 'Food',        value: 25, color: '#22C55E' },
  { name: 'Bills',       value: 15, color: '#F59E0B' },
  { name: 'Transport',   value: 10, color: '#EC4899' },
  { name: 'Others',      value: 10, color: '#8B9DFF' },
]

// Quick action buttons
const QUICK_ACTIONS = [
  { icon: Send,       label: 'Send Money',    to: '/transfer',     color: '#5B6CFF' },
  { icon: PlusCircle, label: 'Add Money',     to: '/transactions', color: '#22C55E' },
  { icon: FileText,   label: 'Pay Bills',     to: '/transactions', color: '#F59E0B' },
  { icon: BarChart2,  label: 'View Analytics',to: '/transactions', color: '#EC4899' },
]

const Dashboard = () => {
  const { user } = useAuth()
  const { transactions, totalBalance, totalIncome, totalExpenses } = useTransactions()

  // Format currency in Indian style
  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`

  const savings = totalIncome - totalExpenses

  return (
    <DashboardLayout>
      {/* ── Header ─────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1E293B] dark:text-[#F1F5F9]">Dashboard</h1>
        <p className="text-[#64748B] text-sm mt-1">
          Hello, {user?.name} 👋 — Here's what's happening with your account today.
        </p>
      </div>

      {/* ── Stats Cards ────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Balance', value: fmt(totalBalance),  color: '#5B6CFF', icon: TrendingUp  },
          { label: 'Income',        value: fmt(totalIncome),   color: '#22C55E', icon: TrendingUp  },
          { label: 'Expenses',      value: fmt(totalExpenses), color: '#EF4444', icon: TrendingDown },
          { label: 'Savings',       value: fmt(savings),       color: '#F59E0B', icon: TrendingUp  },
        ].map(({ label, value, color, icon: Icon }) => (
          <div key={label} className="card">
            <p className="text-xs text-[#64748B] mb-1">{label}</p>
            <p className="text-xl font-bold" style={{ color }}>{value}</p>
            <div className="flex items-center gap-1 mt-1">
              <Icon size={12} style={{ color }} />
              <span className="text-[10px]" style={{ color }}>This month</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts ─────────────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">

        {/* Balance Area Chart — takes 2/3 width */}
        <div className="card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-[#1E293B] dark:text-[#F1F5F9]">Balance Overview</h2>
            <span className="text-xs text-[#64748B] bg-[#F5F7FB] dark:bg-[#0F172A] px-3 py-1 rounded-full">
              This Month
            </span>
          </div>
          {/*
            ResponsiveContainer: makes chart fill parent width.
            AreaChart: shows balance trend over time.
            defs>linearGradient: creates the blue fill gradient.
          */}
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={BALANCE_DATA}>
              <defs>
                <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#5B6CFF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#5B6CFF" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Balance']}
                contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="balance" stroke="#5B6CFF" strokeWidth={2} fill="url(#balGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Pie Chart */}
        <div className="card">
          <h2 className="font-bold text-[#1E293B] dark:text-[#F1F5F9] mb-4">Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={EXPENSE_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                {EXPENSE_DATA.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-1 mt-2">
            {EXPENSE_DATA.map(({ name, color, value }) => (
              <div key={name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                <span className="text-[10px] text-[#64748B]">{name} {value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom: Recent Transactions + Quick Actions ─ */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent Transactions */}
        <div className="card lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-[#1E293B] dark:text-[#F1F5F9]">Recent Transactions</h2>
            <Link to="/transactions" className="text-xs text-[#5B6CFF] flex items-center gap-1 hover:underline">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 4).map(t => (
              <div key={t.id} className="flex items-center justify-between py-2 border-b border-[#F1F5F9] dark:border-[#334155] last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm
                    ${t.type === 'income' ? 'bg-[#22C55E20] text-[#22C55E]' : 'bg-red-50 dark:bg-red-900/20 text-red-500'}`}>
                    {t.type === 'income' ? '↑' : '↓'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1E293B] dark:text-[#F1F5F9]">{t.description}</p>
                    <p className="text-xs text-[#64748B]">{t.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${t.amount > 0 ? 'text-[#22C55E]' : 'text-red-500'}`}>
                  {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="font-bold text-[#1E293B] dark:text-[#F1F5F9] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map(({ icon: Icon, label, to, color }) => (
              <Link key={label} to={to}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#F5F7FB] dark:bg-[#0F172A] hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '20' }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <span className="text-xs font-medium text-[#64748B] text-center leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
