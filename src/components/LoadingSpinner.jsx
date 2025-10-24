import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
