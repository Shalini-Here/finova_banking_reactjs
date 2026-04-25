/**
 * storage.js — localStorage helpers
 * Wraps get/set/remove so we don't repeat JSON.parse everywhere.
 */

export const getItem  = (key) => { try { return JSON.parse(localStorage.getItem(key)) } catch { return null } }
export const setItem  = (key, val) => localStorage.setItem(key, JSON.stringify(val))
export const removeItem = (key) => localStorage.removeItem(key)
