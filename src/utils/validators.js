/**
 * validators.js — Form validation helper functions
 * Used by Login, Register, Contact, Transfer forms.
 */

// Email format check
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// Password must be at least 6 characters
export const isValidPassword = (pw) => pw.length >= 6

// Phone number — 10 digits
export const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone)

// Required field — not empty
export const isRequired = (value) => value.trim().length > 0

// Amount — positive number
export const isValidAmount = (val) => !isNaN(val) && Number(val) > 0
