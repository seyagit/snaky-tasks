'use client'

import { AI_MODELS, AIModel } from '@/lib/ai'

interface ModelSelectorProps {
  selectedModel: AIModel
  onModelChange: (model: AIModel) => void
  className?: string
}

export default function ModelSelector({ 
  selectedModel, 
  onModelChange, 
  className = '' 
}: ModelSelectorProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="model-select" className="text-sm text-gray-600 font-medium">
        AIモデル:
      </label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value as AIModel)}
        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Object.entries(AI_MODELS).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}