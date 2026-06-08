/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, title?: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", title?: string, duration = 5000) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type, title, duration }]);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full sm:w-80 px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onClose={() => removeToast(toast.id)} />
        </div>
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: ToastMessage;
  onClose: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const { message, type, title, duration = 5000 } = toast;
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 250); // start exit animation slightly before removal

    const removeTimer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  const handleCloseClick = () => {
    setIsExiting(true);
    setTimeout(onClose, 250);
  };

  // Select icon based on toast type
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={16} className="text-emerald-500" />;
      case "error":
        return <AlertCircle size={16} className="text-rose-500" />;
      case "warning":
        return <AlertTriangle size={16} className="text-amber-500" />;
      case "info":
      default:
        return <Info size={16} className="text-sky-500" />;
    }
  };

  // Select header tag based on type
  const getHeaderTag = () => {
    if (title) return title;
    switch (type) {
      case "success":
        return "SUCCESS";
      case "error":
        return "ERROR";
      case "warning":
        return "WARNING";
      case "info":
      default:
        return "INFO";
    }
  };

  // Get colors depending on status
  const borderClass = 
    type === "success" ? "border-emerald-500/25 dark:border-emerald-500/15" :
    type === "error" ? "border-rose-500/25 dark:border-rose-500/15" :
    type === "warning" ? "border-amber-500/25 dark:border-amber-500/15" :
    "border-sky-500/25 dark:border-sky-500/15";

  const progressBgClass =
    type === "success" ? "bg-emerald-500" :
    type === "error" ? "bg-rose-500" :
    type === "warning" ? "bg-amber-500" :
    "bg-sky-500";

  return (
    <div
      className={`relative border bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-lg shadow-lg dark:shadow-2xl flex flex-col gap-2 overflow-hidden transition-all duration-250 ${
        isExiting ? "toast-exit" : "toast-enter"
      } ${borderClass}`}
      role="alert"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-2.5 items-start">
          <div className="mt-0.5 flex-shrink-0">{getIcon()}</div>
          <div className="flex-1 min-w-0">
            <span className="font-mono text-[9px] font-bold tracking-wider uppercase select-none block text-slate-500 dark:text-slate-400">
              [{getHeaderTag()}]
            </span>
            <p className="font-sans text-xs text-slate-700 dark:text-slate-200 mt-1 mb-0 leading-normal font-medium">
              {message}
            </p>
          </div>
        </div>
        <button
          onClick={handleCloseClick}
          className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X size={12} />
        </button>
      </div>
      
      {/* Animated progress bar indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-100/50 dark:bg-slate-800/50">
        <div
          className={`h-full toast-progress ${progressBgClass}`}
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
}
