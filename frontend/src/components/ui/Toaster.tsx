import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToasterContextValue {
  showToast: (message: string, type: ToastType) => void;
  hideToast: (id: string) => void;
}

const ToasterContext = React.createContext<ToasterContextValue | undefined>(undefined);

export const useToaster = () => {
  const context = React.useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};

export const ToasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToasterContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toaster toasts={toasts} hideToast={hideToast} />
    </ToasterContext.Provider>
  );
};

interface ToasterProps {
  toasts: Toast[];
  hideToast: (id: string) => void;
}

export const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Global toast handling
  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove toast after 5 seconds
    setTimeout(() => {
      hideToast(id);
    }, 5000);
  };

  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Add to window for global access
  useEffect(() => {
    (window as any).showToast = showToast;
    return () => {
      delete (window as any).showToast;
    };
  }, []);

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'info':
      default:
        return 'bg-blue-500 text-white';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastStyles(
            toast.type
          )} p-4 rounded-md shadow-md flex items-center justify-between min-w-[300px] max-w-md animate-fade-in`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => hideToast(toast.id)}
            className="ml-2 text-white hover:text-gray-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toaster;