"use client"

import { CheckCircle, XCircle } from "lucide-react"

export default function TaskCompletionModal({ isOpen, onClose, task, onComplete }) {
  if (!isOpen || !task) return null

  return (
    <div className="task-detail fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="task-detail-section bg-white dark:bg-03045e rounded-lg shadow-xl w-full max-w-md p-6 text-center">
        <h2 className="section-title text-xl font-semibold text-0077b6 dark:text-48cae4 mb-4">Task Deadline Reached</h2>

        <p className="task-detail-description text-gray-600 dark:text-gray-300 mb-6">
          The deadline for <span className="font-semibold">"{task.title}"</span> has been reached. Did you complete this
          task?
        </p>

        <div className="task-actions flex justify-center space-x-4">
          <button
            onClick={() => onComplete(task, true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Completed
          </button>

          <button
            onClick={() => onComplete(task, false)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <XCircle className="mr-2 h-5 w-5" />
            Not Completed
          </button>
        </div>
      </div>
    </div>
  )
}
