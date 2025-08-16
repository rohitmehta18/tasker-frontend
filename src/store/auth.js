import { create } from 'zustand';

const savedToken = localStorage.getItem('ctm_token');
const savedUser = localStorage.getItem('ctm_user');

const useAuth = create((set) => ({
  token: savedToken || null,
  user: savedUser ? JSON.parse(savedUser) : null,
  setAuth: (token, user) => {
    localStorage.setItem('ctm_token', token);
    localStorage.setItem('ctm_user', JSON.stringify(user));
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('ctm_token');
    localStorage.removeItem('ctm_user');
    set({ token: null, user: null });
  }
}));

export default useAuth;
