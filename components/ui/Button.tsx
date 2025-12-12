import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  asChild,
  ...props 
}) => {
  
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-widest rounded-full transition-all duration-500 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    // Gradient moving from Deep Petrol (#0B232E) to Lighter Petrol/Teal (#064E5E) and back
    primary: "bg-gradient-to-r from-[#0B232E] via-[#064E5E] to-[#0B232E] bg-[length:200%_auto] text-white hover:bg-right shadow-[0_8px_30px_rgb(11,35,46,0.2)] hover:shadow-[0_8px_30px_rgb(11,35,46,0.3)] hover:-translate-y-0.5",
    secondary: "bg-white text-petrol-base border border-petrol-base/10 hover:border-petrol-base/30 shadow-sm hover:shadow-md",
    outline: "border border-petrol-base/20 text-petrol-base/80 hover:border-petrol-base hover:text-petrol-base bg-transparent hover:bg-petrol-base/5",
    ghost: "bg-transparent text-petrol-base/60 hover:text-petrol-base hover:bg-petrol-base/5"
  };

  const sizes = {
    sm: "text-[10px] px-4 py-2",
    md: "text-xs px-6 py-3.5",
    lg: "text-sm px-8 py-5"
  };

  const combinedClasses = twMerge(baseStyles, variants[variant], sizes[size], className);

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;