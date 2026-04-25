# 🏦 Finova Banking

> **Smart Digital Banking for Your Future** — A modern, fully responsive banking dashboard built with React, Tailwind CSS, and Vite.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF?style=flat&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## 📸 Preview

| Home Page | Dashboard | Transactions |
|-----------|-----------|--------------|
| Hero + Features + CTA | Balance charts + Quick Actions | CRUD table + Add modal |

| Login | Register | Profile |
|-------|----------|---------|
| Email/password form | Full sign-up with T&C | 3-tab settings panel |

---

## ✨ Features

- 🔐 **Authentication UI** — Login & Register with form validation (no backend needed)
- 📊 **Dashboard Analytics** — Area chart (balance trend) + Pie chart (expense breakdown) via Recharts
- 💸 **Transaction Management** — Full CRUD: add, view, filter, search, and delete transactions
- 💳 **Money Transfer** — Beneficiary selector, quick amount chips, recent transfers list
- 👤 **User Profile** — Edit profile, change password, 2FA toggle, active sessions
- 🌙 **Dark / Light Mode** — Persisted to `localStorage`, toggled from Navbar or Sidebar
- 🔍 **Global Search** — Real-time search with type filter (All / Income / Expense)
- 🛡️ **Protected Routes** — `PrivateRoute` guard redirects unauthenticated users to `/login`
- 📱 **Fully Responsive** — Mobile hamburger menu, collapsible sidebar, fluid grid layouts
- 🔔 **Toast Notifications** — Auto-dismiss alerts for success, error, and info events

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 18.2.0 | UI component library |
| [React Router DOM](https://reactrouter.com/) | 6.22.0 | Client-side routing + protected routes |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.1 | Utility-first styling |
| [Recharts](https://recharts.org/) | 2.12.0 | Area chart + Pie chart on Dashboard |
| [Lucide React](https://lucide.dev/) | 0.363.0 | Icon library |
| [Vite](https://vitejs.dev/) | 5.1.4 | Build tool + dev server |
| React Context API | built-in | Global state (auth, theme, toasts, transactions) |

---

## 📁 Folder Structure

```
finova_banking/
├── public/
│   └── index.html              # Google Sans font loaded via CDN
│
├── src/
│   ├── main.jsx                # Entry point — ReactDOM + BrowserRouter
│   ├── App.jsx                 # Root — all Context Providers stacked here
│   ├── index.css               # Tailwind base + CSS design tokens + .card, .btn-primary classes
│   │
│   ├── context/                # Global state management (React Context API)
│   │   ├── AuthContext.jsx     # user, login(), logout() — persisted to localStorage
│   │   ├── ThemeContext.jsx    # isDark, toggleTheme() — persisted to localStorage
│   │   ├── ToastContext.jsx    # showToast(msg, type) — auto-dismiss after 3s
│   │   └── TransactionContext.jsx  # transactions[], addTransaction(), deleteTransaction()
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx       # All <Route> definitions in one place
│   │   └── PrivateRoute.jsx    # Checks AuthContext → renders child or <Navigate to="/login">
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Logo, links, search icon, dark toggle, login btn
│   │   │   ├── Sidebar.jsx         # Dashboard nav, user info, logout, dark toggle
│   │   │   ├── Footer.jsx          # Links, services, newsletter subscription
│   │   │   └── DashboardLayout.jsx # Sidebar + scrollable main content wrapper
│   │   └── common/
│   │       └── Button.jsx          # (extendable reusable button component)
│   │
│   ├── pages/
│   │   ├── Home.jsx            # Hero, Features, Stats, CTA banner
│   │   ├── About.jsx           # Company info, objectives, tech stack, key features
│   │   ├── Contact.jsx         # Form (validated) + contact info card
│   │   ├── Search.jsx          # Real-time search with type filter
│   │   ├── auth/
│   │   │   ├── Login.jsx       # Email + password + remember me
│   │   │   └── Register.jsx    # Name, email, password, confirm, T&C checkbox
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx   # Stats cards, Area chart, Pie chart, Quick actions
│   │   ├── transactions/
│   │   │   ├── Transactions.jsx # Table + search/filter + Add modal + delete
│   │   │   └── Transfer.jsx    # Beneficiary dropdown + amount + recent transfers
│   │   └── profile/
│   │       └── Profile.jsx     # 3 tabs: Edit Profile / Change Password / Security
│   │
│   └── utils/
│       ├── validators.js       # isValidEmail, isRequired, isValidPassword, isValidAmount
│       └── storage.js          # localStorage getItem / setItem / removeItem wrappers
│
├── package.json
├── vite.config.js
├── tailwind.config.js          # Google Sans font, custom colors, animations
└── postcss.config.js
```

---

## 🔁 Routes Flow

```
PUBLIC ROUTES (no login required)
──────────────────────────────────
  /           →  Home
  /about      →  About
  /contact    →  Contact
  /search     →  Search
  /login      →  Login
  /register   →  Register

PRIVATE ROUTES (requires login → guarded by PrivateRoute)
──────────────────────────────────────────────────────────
  /dashboard     →  Dashboard
  /transactions  →  Transactions
  /transfer      →  Transfer Money
  /profile       →  Profile

NAVIGATION FLOW
────────────────
  Home ──→ Register / Login ──→ Dashboard
                                    │
               ┌────────────────────┼────────────────────┐
               ▼                    ▼                    ▼
         Transactions           Transfer              Profile
         (CRUD table)        (Send money)        (Settings tabs)
               │
               └──→ Search (accessible from Navbar)
```

---

## 🎨 Design System

### Color Palette

```css
/* Light Theme */
--primary:   #5B6CFF;   /* Blue  = trust / banking */
--secondary: #8B9DFF;   /* Lighter blue = hover states */
--accent:    #22C55E;   /* Green = money / success */
--bg:        #F5F7FB;   /* Soft gray background */
--card:      #FFFFFF;   /* Card surfaces */
--text:      #1E293B;   /* Primary text */
--muted:     #64748B;   /* Secondary / placeholder text */
--border:    #E2E8F0;   /* Dividers and outlines */

/* Dark Theme */
--bg:        #0F172A;   /* Deep navy background */
--card:      #1E293B;   /* Elevated card surface */
--text:      #F1F5F9;   /* Light text */
```

### Typography

Font: **Google Sans** (loaded via Google Fonts CDN in `index.html`)

```html
<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />
```

Configured in `tailwind.config.js`:

```js
fontFamily: {
  sans: ['"Google Sans"', '"Product Sans"', 'sans-serif'],
}
```

### Reusable CSS Classes (defined in `index.css`)

| Class | Usage |
|-------|-------|
| `.card` | White/dark card with rounded corners, border, shadow |
| `.btn-primary` | Blue filled button with hover + active scale |
| `.btn-outline` | Blue border button that fills on hover |
| `.input-field` | Styled input with focus ring |
| `.sidebar-link` | Nav link with active highlight |
| `.page-enter` | Fade-in + slide-up animation on page load |

---

## ⚙️ How Context API Works

All global state is managed with React's built-in `createContext` + `useContext`. No Redux needed.

### Provider Order in `App.jsx`

```jsx
<ThemeProvider>         // 1. Dark mode — outermost (used by everyone)
  <ToastProvider>       // 2. Notifications (used in auth flows)
    <AuthProvider>      // 3. User session
      <TransactionProvider>  // 4. Transaction data
        <AppRoutes />
      </TransactionProvider>
    </AuthProvider>
  </ToastProvider>
</ThemeProvider>
```

### Using a Context in any component

```jsx
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'
import { useTransactions } from '../context/TransactionContext'

// Inside your component:
const { user, login, logout } = useAuth()
const { isDark, toggleTheme } = useTheme()
const { showToast } = useToast()
const { transactions, addTransaction, deleteTransaction } = useTransactions()
```

---

## 🔐 How Authentication Works

Authentication is **simulated** (no backend). In production, replace the mock with real API calls.

**Login flow:**

```
User fills form → validate() runs → simulate API delay (800ms)
→ login({ name, email }) called → saved to AuthContext + localStorage
→ navigate('/dashboard')
```

**Session persistence:**

```js
// AuthContext.jsx — restores session on page refresh
const [user, setUser] = useState(() => {
  const saved = localStorage.getItem('finova_user')
  return saved ? JSON.parse(saved) : null
})
```

**Route protection:**

```jsx
// PrivateRoute.jsx
const { user } = useAuth()
if (!user) return <Navigate to="/login" replace />
return children  // render the protected page
```

---

## 📊 How Charts Work

Charts use [Recharts](https://recharts.org/) — a composable charting library for React.

**Balance Area Chart (Dashboard):**

```jsx
<ResponsiveContainer width="100%" height={200}>
  <AreaChart data={BALANCE_DATA}>
    <defs>
      <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%"  stopColor="#5B6CFF" stopOpacity={0.3} />
        <stop offset="95%" stopColor="#5B6CFF" stopOpacity={0}   />
      </linearGradient>
    </defs>
    <XAxis dataKey="name" />
    <Tooltip />
    <Area dataKey="balance" fill="url(#balGrad)" stroke="#5B6CFF" />
  </AreaChart>
</ResponsiveContainer>
```

**Expense Pie Chart:** Uses `<PieChart>` with `innerRadius` for a donut shape. Each slice gets a `<Cell>` with a custom color.

---

## 🌙 How Dark Mode Works

1. User clicks the 🌙/☀️ toggle (Navbar or Sidebar)
2. `toggleTheme()` flips `isDark` in `ThemeContext`
3. `useEffect` adds/removes the `dark` class on `<html>`
4. Preference is saved to `localStorage` so it persists across refreshes
5. Tailwind's `dark:` variants handle all color switching

```js
// ThemeContext.jsx
useEffect(() => {
  document.documentElement.classList.toggle('dark', isDark)
  localStorage.setItem('finova_theme', isDark ? 'dark' : 'light')
}, [isDark])
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18+** installed ([download](https://nodejs.org/))
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Shalini-Here/finova_banking_reactjs.git

# 2. Navigate into the project
cd finova_banking_reactjs

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Scripts

```bash
npm run build    # Production build → output in /dist
npm run preview  # Preview production build locally
```

### Demo Login

Since there is no backend, you can log in with **any** email and password:

```
Email:    anything@example.com
Password: anypassword
```

---

## 🔧 Connecting a Real Backend

To replace the mock auth with a real API:

**1. Update `Login.jsx`:**
```js
// Replace the mock delay with a real API call
const res = await fetch('https://your-api.com/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: form.email, password: form.password })
})
const data = await res.json()
if (data.user) login(data.user)
```

**2. Update `TransactionContext.jsx`:**
```js
// Replace INITIAL_TRANSACTIONS with a fetch from your API
useEffect(() => {
  fetch('/api/transactions', { headers: { Authorization: `Bearer ${token}` } })
    .then(r => r.json())
    .then(data => setTransactions(data))
}, [])
```

**3. MySQL Schema (suggested):**
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  description VARCHAR(255),
  category VARCHAR(100),
  type ENUM('income','expense'),
  amount DECIMAL(12,2),
  date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 🔑 GitHub Personal Access Token

> ⚠️ **SECURITY WARNING:** Never commit real tokens to your repository or paste them in README files or code comments. Anyone with access to the repo can use them to take over your account.

To configure a Personal Access Token for private repo access or CI/CD:

```bash
# Store it in your environment — never hardcode it
export GITHUB_TOKEN=your_token_here

# Or use .env (add .env to .gitignore!)
echo "GITHUB_TOKEN=your_token_here" >> .env
echo ".env" >> .gitignore
```

If you've accidentally exposed a token, **revoke it immediately:**
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Find the token → click **Delete**
3. Generate a new one with only the scopes you need

---

## 🗺️ Roadmap

- [ ] Backend integration (Node.js/Express + MySQL)
- [ ] JWT-based authentication with refresh tokens
- [ ] Real-time notifications via WebSockets
- [ ] PDF export for transaction history
- [ ] Multi-currency support
- [ ] Beneficiary management (CRUD)
- [ ] Bill payments module
- [ ] PWA support (offline mode)

---

## 🤝 Contributing

Contributions are welcome!

```bash
# 1. Fork the repo
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m 'Add some AmazingFeature'

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👩‍💻 Author

**Shalini** — [@Shalini-Here](https://github.com/Shalini-Here)

---

<div align="center">
  Made with ❤️ by the Finova Team · <a href="https://github.com/Shalini-Here/finova_banking_reactjs">⭐ Star this repo</a>
</div>