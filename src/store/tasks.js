import { create } from 'zustand';
import api from '../utils/api';

const useTasks = create((set, get) => ({
  tasks: [],
  loading: false,
  fetch: async (params = {}) => {
    set({ loading: true });
    try {
      const qs = new URLSearchParams(params).toString();
      const { data } = await api.get(`/tasks${qs ? '?' + qs : ''}`);
      set({ tasks: data.tasks });
    } finally {
      set({ loading: false });
    }
  },
  createTask: async (payload) => {
    const { data } = await api.post('/tasks', payload);
    set({ tasks: [...get().tasks, data.task] });
  },
  updateTask: async (id, payload) => {
    const { data } = await api.put(`/tasks/${id}`, payload);
    set({ tasks: get().tasks.map(t => t._id === id ? data.task : t) });
  },
  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
    set({ tasks: get().tasks.filter(t => t._id !== id) });
  }
}));

export default useTasks;
