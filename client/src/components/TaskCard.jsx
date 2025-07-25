import React, { useState, useEffect } from "react";
import { Check, Edit3, Trash2, X, Save } from "lucide-react";
import toast from "react-hot-toast";

export const TaskCard = ({ task, onComplete, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
  });
  const [isLoading, setIsLoading] = useState(false);
  // NEW: local updatedAt state for immediate UI update after save
  const [updatedAt, setUpdatedAt] = useState(task.updated_at);

  // Also update editData and updatedAt if task prop changes (in case parent refreshes)
  useEffect(() => {
    setEditData({ title: task.title, description: task.description });
    setUpdatedAt(task.updated_at);
  }, [task]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      title: task.title,
      description: task.description,
    });
  };

  const handleSave = async () => {
    if (!editData.title.trim()) return;

    setIsLoading(true);
    try {
      const updatedTask = await onUpdate(
        task.id,
        editData.title.trim(),
        editData.description.trim()
      );
      toast.success("Task Updated successfully");
      setIsEditing(false);
      // Update local updatedAt state immediately
      setUpdatedAt(updatedTask.updated_at);
    } catch (error) {
      console.error("Failed to update task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: task.title,
      description: task.description,
    });
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await onComplete(task.id);
      toast.success("Task Completed");
    } catch (error) {
      console.error("Failed to complete task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setIsLoading(true);
      toast.success("Task Deleted successfully");
      try {
        await onDelete(task.id);
      } catch (error) {
        console.error("Failed to delete task:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-gray-800/30 dark:to-gray-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-300"
              placeholder="Task title..."
            />
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none transition-all duration-300"
              placeholder="Task description..."
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={isLoading || !editData.title.trim()}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600 text-white px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 leading-tight">
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-3">
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">
                  {updatedAt
                    ? `Updated ${formatDate(updatedAt)}`
                    : `Created ${formatDate(task.created_at)}`}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleComplete}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                <Check className="w-4 h-4" />
                Done
              </button>

              <button
                onClick={handleEdit}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>

              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
