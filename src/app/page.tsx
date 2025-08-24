'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { generateSarcasticResponse } from '@/lib/ai'
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'

interface Task {
  id: string
  title: string
  completed: boolean
  ai_response: string | null
  created_at: string
  updated_at: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (title: string) => {
    setSubmitting(true)
    try {
      const aiResponse = await generateSarcasticResponse(title)
      
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          title,
          completed: false,
          ai_response: aiResponse
        }])
        .select()
        .single()
      
      if (error) throw error
      setTasks(prev => [data, ...prev])
    } catch (error) {
      console.error('Error adding task:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed, updated_at: new Date().toISOString() })
        .eq('id', id)
      
      if (error) throw error
      
      setTasks(prev => 
        prev.map(task => 
          task.id === id ? { ...task, completed } : task
        )
      )
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🐍 SnakyTasks
          </h1>
          <p className="text-gray-600">
            タスク管理と皮肉なコメントをお楽しみください
          </p>
        </header>

        <TaskForm onSubmit={addTask} loading={submitting} />
        <TaskList 
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onDelete={deleteTask}
          loading={loading}
        />
      </div>
    </div>
  )
}