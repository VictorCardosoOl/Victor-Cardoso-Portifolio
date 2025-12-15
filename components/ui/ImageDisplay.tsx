import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageDisplayProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    containerClassName?: string;
    className?: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
    src,
    alt,
    containerClassName = "",
    className = "",
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden bg-gray-200/20 ${containerClassName}`}>
            {/* Loading Skeleton / Blur Placeholder */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-petrol-base/10 backdrop-blur-sm z-10 flex items-center justify-center"
                    >
                        <div className="w-8 h-8 rounded-full border-2 border-petrol-base/20 border-t-petrol-base animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.img
                src={src}
                alt={alt}
                className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
                initial={{ scale: 1.1 }}
                animate={{ scale: isLoaded ? 1 : 1.1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                {...props}
            />
        </div>
    );
};

export default ImageDisplay;
