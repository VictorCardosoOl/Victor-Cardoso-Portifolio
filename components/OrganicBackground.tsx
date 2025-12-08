import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const OrganicBackground: React.FC = () => {
    // Optimized: Use refs for throttling to avoid re-renders on every frame if logic was complex
    // Framer motion values don't trigger React re-renders, which is good.
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Looser spring config for less "catch up" calculation per frame
    const springConfig = { damping: 50, stiffness: 100, mass: 1 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        let frameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            // Optimization: Cancel previous frame request if multiple events fire in one frame
            cancelAnimationFrame(frameId);

            frameId = requestAnimationFrame(() => {
                mouseX.set(e.clientX - 250);
                mouseY.set(e.clientY - 250);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(frameId);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* 
               Performance Hack: 
               Instead of CSS 'filter: blur()', use 'radial-gradient' with alpha transparency.
               CSS Blur is very expensive on large areas (convolutions).
               Gradients are cheap and GPU accelerated.
               'will-change-transform' hints GPU to promote to own layer.
            */}

            {/* Interactive Blob */}
            <motion.div
                style={{ x, y }}
                className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-30 mix-blend-multiply will-change-transform"
                style={{
                    ...{ x, y }, // Merge style prop
                    background: 'radial-gradient(circle, rgba(165, 180, 252, 0.8) 0%, rgba(99, 102, 241, 0) 70%)'
                }}
            />

            {/* Ambient Orb 1 */}
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -100, 50, 0],
                    transform: 'translateZ(0)', // Force GPU
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear", // Linear is cheaper than calc bezier
                }}
                className="absolute top-[10%] left-[20%] w-[400px] h-[400px] rounded-full opacity-25 mix-blend-multiply will-change-transform"
                style={{
                    background: 'radial-gradient(circle, rgba(186, 230, 253, 0.8) 0%, rgba(14, 165, 233, 0) 70%)'
                }}
            />

            {/* Ambient Orb 2 */}
            <motion.div
                animate={{
                    x: [0, -80, 60, 0],
                    y: [0, 90, -40, 0],
                    transform: 'translateZ(0)',
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2,
                }}
                className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full opacity-25 mix-blend-multiply will-change-transform"
                style={{
                    background: 'radial-gradient(circle, rgba(221, 214, 254, 0.8) 0%, rgba(139, 92, 246, 0) 70%)'
                }}
            />
        </div>
    );
};

// Memoize to prevent re-renders from parent
export default React.memo(OrganicBackground);
