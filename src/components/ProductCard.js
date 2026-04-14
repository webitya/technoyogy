'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);

  if (!product || !product.images || !Array.isArray(product.images) || product.images.length === 0) {
    return null; // Or a placeholder
  }

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="group flex flex-col bg-white border border-gray-100 rounded-[3px] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#7a3983]/5">
      {/* Image Carousel */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-50">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={product.images[currentImage]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>

        {product.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm text-[#1a1a1a] rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5} /></svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm text-[#1a1a1a] rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={2.5} /></svg>
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {product.images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImage ? 'bg-[#7a3983] w-4' : 'bg-white/60'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
           <h3 className="text-[13px] font-black text-[#1a1a1a] uppercase tracking-widest line-clamp-1 mb-2">{product.title}</h3>
           <p className="text-[11px] font-medium text-gray-400 line-clamp-2 leading-relaxed">
             {product.description}
           </p>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50">
           <a 
              href={product.buyLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3.5 bg-[#7a3983] text-white text-[10px] font-black uppercase tracking-[3px] rounded-[2px] shadow-lg shadow-[#7a3983]/10 hover:shadow-[#7a3983]/25 hover:scale-[1.02] transition-all"
           >
              BUY NOW AT SOURCE
           </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
