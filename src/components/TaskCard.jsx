import { motion } from 'framer-motion';
import { format } from 'date-fns';
import useAuth from '../store/auth';
import useTasks from '../store/tasks';
import { randomLoveNote } from './loveNotes';

const statusColor = (s) => ({
  'Not Started': 'bg-status-notStarted',
  'In Progress': 'bg-status-inProgress',
  'Completed': 'bg-status-completed'
}[s]);

const priorityClass = (p) => ({
  'Low': 'border-green-300',
  'Medium': 'border-yellow-300',
  'High': 'border-orange-300',
  'Urgent': 'border-red-400'
}[p]);

export default function TaskCard({ task, isOwner, onToast }) {
  const { updateTask, deleteTask } = useTasks();
  const { user } = useAuth();

  async function toggleComplete() {
    const next = task.status === 'Completed' ? 'Not Started' : 'Completed';
    await updateTask(task._id, { status: next });
    if (next === 'Completed' && onToast) onToast(randomLoveNote());
  }

  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      className={`glass p-4 rounded-2xl border ${priorityClass(task.priority)} flex flex-col gap-2`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${statusColor(task.status)}`}></span>
          <h3 className="font-semibold">{task.title}</h3>
        </div>
        <div className="text-xs opacity-70">{format(new Date(task.date), 'MM/dd/yyyy')}</div>
      </div>
      {task.description && <p className="text-sm opacity-80">{task.description}</p>}
      {task.tags?.length ? <div className="text-xs opacity-70">#{task.tags.join(' #')}</div> : null}
      <div className="flex items-center justify-between text-sm">
        <div className="opacity-70">{task.status} • {task.priority}</div>
        <div className="flex gap-2">
          {isOwner ? (
            <>
              <button onClick={toggleComplete} className="px-3 py-1 rounded-xl bg-white">Toggle Complete</button>
              <button onClick={() => deleteTask(task._id)} className="px-3 py-1 rounded-xl bg-white">Delete</button>
            </>
          ) : <span className="opacity-60">by {task.owner?.name || 'partner'}</span>}
        </div>
      </div>
    </motion.div>
  );
}
