interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  onClick,
  href
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full';
  
  const variants = {
    primary:
      'bg-gradient-to-b from-[#2F7FEF] via-[#1C5BBF] to-[#0F3D8C] text-white border border-[#1C5BBF] shadow-[0_18px_40px_rgba(15,61,140,0.4)] hover:shadow-[0_24px_55px_rgba(15,61,140,0.6)] hover:brightness-105 focus:ring-[#1C5BBF]',
    secondary:
      'bg-white text-[#0F3D8C] border border-[#D1E3FF] shadow-[0_10px_28px_rgba(15,61,140,0.18)] hover:border-[#1C5BBF] hover:bg-[#F5F8FF] focus:ring-[#1C5BBF]/20',
    outline:
      'bg-transparent text-[#0F3D8C] border border-[#9ABAF5] hover:bg-[#E8F0FF] hover:border-[#1C5BBF] focus:ring-[#1C5BBF]/30'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-7 py-3.5 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
