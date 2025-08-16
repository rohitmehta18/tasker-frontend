import { useEffect, useMemo, useState } from 'react';
import { format, startOfDay, endOfDay } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../store/auth';
import useTasks from '../store/tasks';
import api from '../utils/api';
import DatePicker from '../components/DatePicker';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { quoteOfDay } from '../components/quotes';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { tasks, fetch } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [group, setGroup] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => { fetchRange(); /* eslint-disable-next-line */ }, [selectedDate]);

  async function fetchRange() {
    const from = startOfDay(selectedDate).toISOString();
    const to = endOfDay(selectedDate).toISOString();
    await fetch({ from, to });
  }

  useEffect(() => { (async () => {
      const { data } = await api.get('/relationships/my-group');
      setGroup(data.group);
  })(); }, []);

  const myTasks = useMemo(() => tasks.filter(t => t.owner?._id === user?.id || t.owner === user?.id), [tasks, user]);
  const sharedTasks = useMemo(() => tasks.filter(t => (t.owner?._id || t.owner) !== user?.id), [tasks, user]);

  async function createGroup() {
    const { data } = await api.post('/relationships/create-group', { name: `${user.name}'s Household` });
    setGroup(data.group);
  }

  async function getCode() {
    const { data } = await api.post('/relationships/invite-code');
    navigator.clipboard?.writeText(data.code);
    alert('Invite code copied: ' + data.code);
  }

  async function joinByCode() {
    const code = prompt('Enter invite code:');
    if (!code) return;
    const { data } = await api.post('/relationships/join-by-code', { code });
    setGroup(data.group);
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name} 💕</h1>
          <p className="opacity-70">{format(selectedDate, 'MMMM dd, yyyy')}</p>
        </div>
        <div className="flex gap-2">
          {!group ? <button onClick={createGroup} className="px-3 py-2 rounded-xl bg-white">Create Group</button>
            : <>
                <button onClick={getCode} className="px-3 py-2 rounded-xl bg-white">Invite Code</button>
                <button onClick={joinByCode} className="px-3 py-2 rounded-xl bg-white">Join by Code</button>
              </>}
          <button onClick={logout} className="px-3 py-2 rounded-xl bg-white">Logout</button>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="glass p-4 rounded-2xl">
            <div className="text-center text-lg font-semibold">"{quoteOfDay()}"</div>
          </div>
          <TaskForm />
          <div className="grid md:grid-cols-2 gap-4">
            <section>
              <h2 className="font-semibold mb-2">My Assignments ❤️</h2>
              <div className="flex flex-col gap-3">
                <AnimatePresence initial={false}>
                  {myTasks.map(t => <TaskCard key={t._id} task={t} isOwner onToast={setToast} />)}
                </AnimatePresence>
              </div>
            </section>
            <section>
              <h2 className="font-semibold mb-2">Shared Assignments 💕</h2>
              <div className="flex flex-col gap-3">
                <AnimatePresence initial={false}>
                  {sharedTasks.map(t => <TaskCard key={t._id} task={t} isOwner={false} />)}
                </AnimatePresence>
              </div>
            </section>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <DatePicker value={selectedDate} onChange={setSelectedDate} />
          <div className="glass p-4 rounded-2xl">
            <h3 className="font-semibold mb-2">Group</h3>
            {!group ? <div className="text-sm opacity-70">Create or join a group to see shared tasks.</div> :
              <ul className="text-sm">
                {group.members?.map(m => <li key={m._id}>💗 {m.name} ({m.email})</li>)}
              </ul>
            }
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onAnimationComplete={() => setTimeout(()=>setToast(''), 1600)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl bg-white shadow glass">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
