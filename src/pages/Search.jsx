/**
 * Search.jsx — Global search page (public route: /search)
 *
 * Searches across all transaction descriptions, categories.
 * Also filters by type: All | Transactions | Income | Expense
 */
import React, { useState, useMemo } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Search as SearchIcon, Filter, TrendingUp, TrendingDown } from 'lucide-react'
import { useTransactions } from '../context/TransactionContext'

const FILTERS = ['All', 'Income', 'Expense']

const Search = () => {
  const { transactions } = useTransactions()
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  // Filter logic: match query (case-insensitive) + type filter
  const results = useMemo(() => {
    return transactions.filter(t => {
      const matchesQuery =
        t.description.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase())
      const matchesFilter =
        activeFilter === 'All' ||
        t.type === activeFilter.toLowerCase()
      return matchesQuery && matchesFilter
    })
  }, [query, activeFilter, transactions])

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB] dark:bg-[#0F172A]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-16 page-enter w-full">
        <h1 className="text-2xl font-bold text-[#1E293B] dark:text-[#F1F5F9] mb-2">
          Global <span className="text-[#5B6CFF]">Search</span>
        </h1>
        <p className="text-[#64748B] text-sm mb-8">Search through transactions, names, and categories.</p>

        {/* ── Search Input ───────────────────────────────── */}
        <div className="relative mb-4">
          <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search transactions, categories..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="input-field pl-11 text-base"
            autoFocus
          />
        </div>

        {/* ── Filter Tabs ────────────────────────────────── */}
        <div className="flex gap-2 mb-6">
          <Filter size={16} className="text-[#64748B] self-center" />
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                ${activeFilter === f
                  ? 'bg-[#5B6CFF] text-white'
                  : 'bg-white dark:bg-[#1E293B] text-[#64748B] hover:text-[#5B6CFF] border border-[#E2E8F0] dark:border-[#334155]'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Results ────────────────────────────────────── */}
        {query === '' ? (
          <div className="text-center py-20 text-[#64748B]">
            <SearchIcon size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm">Start typing to search transactions...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20 text-[#64748B]">
            <p className="text-sm">No results found for "<strong>{query}</strong>"</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-[#64748B] mb-4">{results.length} result{results.length !== 1 ? 's' : ''} found</p>
            <div className="space-y-3">
              {results.map(t => (
                <div key={t.id}
                  className="card flex items-center justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${t.type === 'income' ? 'bg-[#22C55E20]' : 'bg-red-50 dark:bg-red-900/20'}`}>
                      {t.type === 'income'
                        ? <TrendingUp size={16} className="text-[#22C55E]" />
                        : <TrendingDown size={16} className="text-red-500" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1E293B] dark:text-[#F1F5F9]">{t.description}</p>
                      <p className="text-xs text-[#64748B]">{t.category} • {t.date}</p>
                    </div>
                  </div>
                  <span className={`font-bold text-sm ${t.amount > 0 ? 'text-[#22C55E]' : 'text-red-500'}`}>
                    {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Search
