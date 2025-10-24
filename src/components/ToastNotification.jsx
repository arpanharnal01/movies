import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const ToastNotification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl px-6 py-4 flex items-center space-x-3 min-w-[300px]">
        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
        <p className="text-white flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
