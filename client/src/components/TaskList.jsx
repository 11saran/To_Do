import React, { useState, useEffect } from "react";
import { List, RefreshCw } from "lucide-react";
import { apiService } from "../services/api";
import { TaskCard } from "./TaskCard";

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.getTasks();

      if (Array.isArray(response)) {
        setTasks(response);
      } else if (Array.isArray(response.tasks)) {
        setTasks(response.tasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load tasks");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [refreshKey]);

  const handleTaskComplete = async (id) => {
    try {
      await apiService.completeTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  const handleTaskUpdate = async (id, title, description) => {
    try {
      const updatedTask = await apiService.updateTask(id, {
        title,
        description,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                title,
                description,
                updated_at: updatedTask.updated_at, // Ensure this is included
              }
            : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };


  const handleTaskDelete = async (id) => {
    try {
      await apiService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl -z-10"></div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
            <List className="w-5 h-5 text-white" />
          </div>
          Recent Tasks
        </h2>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="p-3 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transform hover:scale-110"
          aria-label="Refresh tasks"
        >
          <RefreshCw
            className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-xl backdrop-blur-sm">
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            {error}
          </p>
          <button
            onClick={handleRefresh}
            className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 underline font-medium transition-colors duration-200"
          >
            Try again
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl h-36 animate-pulse"
            />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <List className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-3">
            No tasks yet
          </h3>
          <p className="text-gray-500 dark:text-gray-500 text-base">
            Add your first task to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleTaskComplete}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
