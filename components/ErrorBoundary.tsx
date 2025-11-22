import React, { Component, ReactNode } from 'react';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console and call custom error handler
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // TODO: Send error to error reporting service like Sentry
    // Example: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="text-red-500 text-6xl mb-4">
              <FaExclamationTriangle className="mx-auto" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Oops! Terjadi Kesalahan
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Maaf, halaman mengalami error yang tidak terduga. Tim kami sudah diberitahu dan akan segera memperbaikinya.
            </p>

            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Detail Error (Development)
                </summary>
                <div className="text-xs text-red-600 dark:text-red-400 font-mono">
                  <p className="font-bold">{this.state.error.name}: {this.state.error.message}</p>
                  {this.state.errorInfo && (
                    <pre className="mt-2 overflow-auto max-h-40">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 bg-seltronik-red text-white px-4 py-2 rounded-lg hover:bg-seltronik-red-hover transition-colors flex items-center justify-center gap-2"
              >
                <FaRedo />
                Coba Lagi
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <FaHome />
                Ke Beranda
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              Error ID: {Date.now().toString(36)}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for easier usage
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: ReactNode,
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={errorFallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

export default ErrorBoundary;