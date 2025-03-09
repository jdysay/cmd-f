import React from 'react';
import "../css/App.css";


export function Button({ children, size, variant, className, ...props }) {
  // Default styles with transition for hover effect and rounded corners
  const baseStyles = 'py-2 px-4 rounded-full font-semibold focus:outline-none focus:ring-2 transition-all duration-300 font-[Caprasimo], cursive';

  // Define size styles
  const sizeStyles = {
    sm: 'text-sm py-2 px-3',
    lg: 'text-xl py-4 px-9',
    // Add more sizes if needed
  };

  // Define variant styles with the new color #543B75
  const variantStyles = {
    solid: 'bg-[#543B75] text-white hover:bg-[#432A5B] focus:ring-[#543B75]',
    outline: 'border border-[#543B75] text-[#543B75] hover:bg-[#432A5B] hover:text-white hover:border-white focus:ring-[#543B75]',
    // Add more variants if needed
  };

  // Combine all styles
  const buttonClassNames = `${baseStyles} ${sizeStyles[size] || sizeStyles.lg} ${variantStyles[variant] || variantStyles.solid} ${className || ''}`;

  return (
    <button className={buttonClassNames} {...props}>
      {children}
    </button>
  );
}

export default Button;
