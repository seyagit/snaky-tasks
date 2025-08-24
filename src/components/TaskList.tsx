'use client'

interface Task {
  id: string
  title: string
  completed: boolean
  ai_response: string | null
  created_at: string
  updated_at: string
}

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  loading?: boolean
}

export default function TaskList({ tasks, onToggleComplete, onDelete, loading }: TaskListProps) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">タスクを読み込み中...</p>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>まだタスクがありません。</p>
        <p>上のフォームからタスクを追加してみてください！</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => onToggleComplete(task.id, e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span
                className={`flex-1 ${
                  task.completed
                    ? 'text-gray-500 line-through'
                    : 'text-gray-900'
                }`}
              >
                {task.title}
              </span>
            </div>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              削除
            </button>
          </div>
          
          {task.ai_response && (
            <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm text-yellow-800 italic">
                🐍 {task.ai_response}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}