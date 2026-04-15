import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, X } from 'lucide-react';

const SmartNotification = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="text-success" size={20} />,
    info: <Info className="text-primary" size={20} />,
  };

  const colors = {
    success: 'border-success/20 bg-success/5',
    info: 'border-primary/20 bg-primary/5',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`fixed bottom-8 right-8 z-[200] flex items-center gap-4 p-4 glass border ${colors[type]} min-w-[300px] shadow-[0_20px_40px_rgba(0,0,0,0.4)]`}
    >
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <div className="flex-grow">
        <p className="text-sm font-bold text-white leading-tight">{message}</p>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">System Status: Active</p>
      </div>
      <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
        <X size={16} className="text-gray-500" />
      </button>
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: 0 }}
        transition={{ duration: 5, ease: 'linear' }}
        className="absolute bottom-0 left-0 h-0.5 bg-primary/40"
      />
    </motion.div>
  );
};

export default SmartNotification;
