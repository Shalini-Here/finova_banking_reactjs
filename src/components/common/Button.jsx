/*
  Button.jsx — Reusable button component
  =======================================
  Props:
    variant: 'primary' | 'secondary' | 'ghost' | 'danger'
    size:    'sm' | 'md' | 'lg'
    loading: boolean — shows spinner
    children, onClick, type, className, disabled
*/
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
}) => {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all cursor-pointer border-none';

  const sizes = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  const variants = {
    primary:   'text-white',
    secondary: 'text-white',
    ghost:     '',
    danger:    'text-white bg-red-500 hover:bg-red-600',
  };

  const inlineStyle = variant === 'primary'
    ? { background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }
    : variant === 'secondary'
    ? { background: 'var(--bg)', border: '1.5px solid var(--border)', color: 'var(--text)' }
    : variant === 'ghost'
    ? { background: 'transparent', color: 'var(--primary)' }
    : {};

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className} ${disabled || loading ? 'opacity-60 cursor-not-allowed' : ''}`}
      style={inlineStyle}
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  );
};


/*
  Card.jsx — Reusable card wrapper
  =================================
  Wraps content in the finova-card style box.
  Props: children, className, padding (default true)
*/
export const Card = ({ children, className = '', noPad = false }) => (
  <div
    className={`finova-card ${noPad ? '' : 'p-6'} ${className}`}
  >
    {children}
  </div>
);


/*
  Input.jsx — Reusable input field
  =================================
  Props: label, error, icon (left icon component), all standard input props
*/
export const Input = ({ label, error, icon: Icon, className = '', ...props }) => (
  <div className="w-full">
    {label && (
      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
        {label}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }}>
          <Icon size={16} />
        </div>
      )}
      <input
        className={`finova-input ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);
