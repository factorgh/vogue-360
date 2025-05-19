import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { House } from 'lucide-react';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found | Vogue 360';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center text-center p-4"
    >
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
      <p className="max-w-md mb-8 text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary inline-flex items-center">
        <House size={18} className="mr-2" />
        Back to House
      </Link>
    </motion.div>
  );
}
