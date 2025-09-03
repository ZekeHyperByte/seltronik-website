import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaTimes, FaExclamationTriangle, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

interface ErrorInfo {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    handler: () => void;
  };
}

interface ErrorContextValue {
  errors: ErrorInfo[];
  showError: (error: Omit<ErrorInfo, 'id'>) => void;
  showSuccess: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
  dismissError: (id: string) => void;
  clearAllErrors: () => void;
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [errors, setErrors] = useState<ErrorInfo[]>([]);

  const showError = useCallback((error: Omit<ErrorInfo, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36);
    const newError: ErrorInfo = {
      ...error,
      id,
      duration: error.duration || (error.type === 'error' ? 8000 : 5000),
    };

    setErrors(prev => [...prev, newError]);

    // Auto dismiss after duration
    if (newError.duration && newError.duration > 0) {
      setTimeout(() => {
        dismissError(id);
      }, newError.duration);
    }
  }, []);

  const showSuccess = useCallback((message: string, title: string = 'Berhasil') => {
    showError({ type: 'success', title, message, duration: 4000 });
  }, [showError]);

  const showWarning = useCallback((message: string, title: string = 'Peringatan') => {
    showError({ type: 'warning', title, message, duration: 6000 });
  }, [showError]);

  const showInfo = useCallback((message: string, title: string = 'Informasi') => {
    showError({ type: 'info', title, message, duration: 5000 });
  }, [showError]);

  const dismissError = useCallback((id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const getErrorIcon = (type: ErrorInfo['type']) => {
    switch (type) {
      case 'error': return <FaExclamationTriangle />;
      case 'warning': return <FaExclamationTriangle />;
      case 'info': return <FaInfoCircle />;
      case 'success': return <FaCheckCircle />;
      default: return <FaInfoCircle />;
    }
  };

  const getErrorStyles = (type: ErrorInfo['type']) => {
    switch (type) {
      case 'error': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200';
      case 'info': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
      case 'success': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
      default: return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <ErrorContext.Provider value={{
      errors,
      showError,
      showSuccess,
      showWarning,
      showInfo,
      dismissError,
      clearAllErrors,
    }}>
      {children}
      
      {/* Error Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
        <AnimatePresence>
          {errors.map((error) => (
            <motion.div
              key={error.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`border rounded-lg p-4 shadow-lg ${getErrorStyles(error.type)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-lg">
                  {getErrorIcon(error.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{error.title}</h4>
                  <p className="text-sm mt-1 opacity-90">{error.message}</p>
                  
                  {error.action && (
                    <button
                      onClick={error.action.handler}
                      className="text-xs underline mt-2 hover:no-underline"
                    >
                      {error.action.label}
                    </button>
                  )}
                </div>
                
                <button
                  onClick={() => dismissError(error.id)}
                  className="flex-shrink-0 text-sm opacity-60 hover:opacity-100 transition-opacity"
                  aria-label="Tutup notifikasi"
                >
                  <FaTimes />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ErrorContext.Provider>
  );
};