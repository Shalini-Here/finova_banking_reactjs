/**
 * TransactionContext.jsx — Transaction data global state
 *
 * Provides a list of mock transactions and CRUD helpers.
 * In a real app, these would be API calls to a backend/MySQL DB.
 *
 * Usage:
 *   const { transactions, addTransaction, deleteTransaction } = useTransactions()
 */
import React, { createContext, useContext, useState } from 'react'

const TransactionContext = createContext({})

// ── Seed / Mock Data ──────────────────────────────────────────
const INITIAL_TRANSACTIONS = [
  { id: 1,  date: '2024-05-15', description: 'Amazon Shopping',     category: 'Shopping',       type: 'expense', amount: -2450  },
  { id: 2,  date: '2024-05-12', description: 'Salary Credit',       category: 'Income',         type: 'income',  amount: 52000  },
  { id: 3,  date: '2024-05-11', description: 'Spotify Subscription',category: 'Entertainment',  type: 'expense', amount: -129   },
  { id: 4,  date: '2024-05-10', description: 'Electricity Bill',    category: 'Bills',          type: 'expense', amount: -1200  },
  { id: 5,  date: '2024-05-09', description: 'Swiggy Order',        category: 'Food',           type: 'expense', amount: -450   },
  { id: 6,  date: '2024-05-08', description: 'Freelance Payment',   category: 'Income',         type: 'income',  amount: 8500   },
  { id: 7,  date: '2024-05-07', description: 'Uber Ride',           category: 'Transport',      type: 'expense', amount: -320   },
  { id: 8,  date: '2024-05-06', description: 'Internet Bill',       category: 'Bills',          type: 'expense', amount: -699   },
]

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS)

  // Add a new transaction (e.g., from Transfer page)
  const addTransaction = (txn) => {
    const newTxn = { ...txn, id: Date.now() }
    setTransactions(prev => [newTxn, ...prev])
  }

  // Delete by id (from Transactions list)
  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  // Computed summary values used in Dashboard
  const totalBalance  = 125000.50
  const totalIncome   = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0)

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      deleteTransaction,
      totalBalance,
      totalIncome,
      totalExpenses,
    }}>
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionContext)
