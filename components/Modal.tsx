import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
  enableAnimation?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-4xl',
  enableAnimation = true
}) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const overlayProps = {
    className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
    onClick: onClose
  };

  const modalProps = {
    className: `bg-white dark:bg-gray-800 rounded-2xl ${maxWidth} w-full max-h-[90vh] overflow-y-auto modal-content`,
    onClick: (e: React.MouseEvent) => e.stopPropagation()
  };

  const modalContent = (
    <div {...overlayProps}>
      <div {...modalProps}>
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 md:p-6 flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h2 className="text-xl md:text-2xl font-bold text-seltronik-dark dark:text-white mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        enableAnimation ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...overlayProps}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              {...modalProps}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 md:p-6 flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <h2 className="text-xl md:text-2xl font-bold text-seltronik-dark dark:text-white mb-2">
                    {title}
                  </h2>
                  {subtitle && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {subtitle}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 md:p-6">
                {children}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          modalContent
        )
      )}
    </AnimatePresence>
  );
};

export default Modal;