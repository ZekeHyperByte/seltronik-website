import { useCallback } from 'react';
import { useError } from '../contexts/ErrorContext';

interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const useErrorHandler = () => {
  const { showError, showSuccess, showWarning, showInfo } = useError();

  const handleApiError = useCallback((error: unknown, customMessage?: string) => {
    console.error('API Error:', error);
    
    let message = customMessage || 'Terjadi kesalahan yang tidak terduga';
    let title = 'Error';

    if (error instanceof Error) {
      message = customMessage || error.message;
    } else if (typeof error === 'string') {
      message = customMessage || error;
    } else if (error && typeof error === 'object') {
      const apiError = error as ApiError;
      
      if (apiError.status) {
        switch (apiError.status) {
          case 400:
            title = 'Permintaan Tidak Valid';
            message = customMessage || 'Data yang dikirim tidak valid';
            break;
          case 401:
            title = 'Tidak Diauthorisasi';
            message = customMessage || 'Anda perlu login untuk mengakses fitur ini';
            break;
          case 403:
            title = 'Akses Ditolak';
            message = customMessage || 'Anda tidak memiliki izin untuk melakukan aksi ini';
            break;
          case 404:
            title = 'Tidak Ditemukan';
            message = customMessage || 'Data yang diminta tidak ditemukan';
            break;
          case 429:
            title = 'Terlalu Banyak Permintaan';
            message = customMessage || 'Silakan tunggu beberapa saat sebelum mencoba lagi';
            break;
          case 500:
            title = 'Server Error';
            message = customMessage || 'Terjadi kesalahan di server. Tim kami sudah diberitahu';
            break;
          case 503:
            title = 'Layanan Tidak Tersedia';
            message = customMessage || 'Layanan sedang maintenance. Coba lagi nanti';
            break;
          default:
            message = customMessage || apiError.message || 'Terjadi kesalahan pada server';
        }
      } else {
        message = customMessage || apiError.message || message;
      }
    }

    showError({
      type: 'error',
      title,
      message,
      duration: 8000,
    });
  }, [showError]);

  const handleNetworkError = useCallback(() => {
    showError({
      type: 'error',
      title: 'Koneksi Bermasalah',
      message: 'Periksa koneksi internet Anda dan coba lagi',
      duration: 6000,
      action: {
        label: 'Coba Lagi',
        handler: () => window.location.reload(),
      },
    });
  }, [showError]);

  const handleValidationError = useCallback((fields: Record<string, string[]>) => {
    const errors = Object.entries(fields)
      .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
      .join('\n');
    
    showError({
      type: 'warning',
      title: 'Data Tidak Valid',
      message: errors,
      duration: 10000,
    });
  }, [showError]);

  // Wrapper for async operations with error handling
  const withErrorHandling = useCallback(
    <T>(
      asyncOperation: () => Promise<T>,
      options?: {
        loadingMessage?: string;
        successMessage?: string;
        errorMessage?: string;
        showSuccess?: boolean;
      }
    ) => {
      return async (): Promise<T | undefined> => {
        try {
          if (options?.loadingMessage) {
            showInfo(options.loadingMessage, 'Loading...');
          }

          const result = await asyncOperation();

          if (options?.showSuccess && options?.successMessage) {
            showSuccess(options.successMessage);
          }

          return result;
        } catch (error) {
          handleApiError(error, options?.errorMessage);
          return undefined;
        }
      };
    },
    [handleApiError, showInfo, showSuccess]
  );

  return {
    handleApiError,
    handleNetworkError,
    handleValidationError,
    withErrorHandling,
    showSuccess,
    showWarning,
    showInfo,
    showError,
  };
};