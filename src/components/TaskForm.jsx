import { useState } from 'react';
import useTasks from '../store/tasks';

export default function TaskForm() {
  const { createTask } = useTasks();
  const [form, setForm] = useState({
    title: '', description: '', date: new Date().toISOString().slice(0,10),
    status: 'Not Started', priority: 'Low', tags: ''
  });

  async function submit(e) {
    e.preventDefault();
    const payload = { ...form, tags: form.tags ? form.tags.split(',').map(s => s.trim()).filter(Boolean) : [] };
    await createTask(payload);
    setForm({ ...form, title: '', description: '', tags: '' });
  }

  return (
    <form onSubmit={submit} className="glass p-4 rounded-2xl grid md:grid-cols-2 gap-3">
      <input className="px-3 py-2 rounded-xl" placeholder="Title *" value={form.title} onChange={e=>setForm(f=>({...f, title:e.target.value}))} required />
      <input className="px-3 py-2 rounded-xl" placeholder="MM/DD/YYYY" type="date" value={form.date} onChange={e=>setForm(f=>({...f, date:e.target.value}))} required />
      <textarea className="px-3 py-2 rounded-xl md:col-span-2" placeholder="Description (optional)" value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))} />
      <select className="px-3 py-2 rounded-xl" value={form.status} onChange={e=>setForm(f=>({...f, status:e.target.value}))}>
        <option>Not Started</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <select className="px-3 py-2 rounded-xl" value={form.priority} onChange={e=>setForm(f=>({...f, priority:e.target.value}))}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Urgent</option>
      </select>
      <input className="px-3 py-2 rounded-xl md:col-span-2" placeholder="Tags (comma separated)" value={form.tags} onChange={e=>setForm(f=>({...f, tags:e.target.value}))} />
      <button className="px-3 py-2 rounded-xl bg-white md:col-span-2">Add Task 💖</button>
    </form>
  );
}
