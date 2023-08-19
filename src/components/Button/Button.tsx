import {ButtonHTMLAttributes, ReactNode} from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({className, children, disabled, ...props}: ButtonProps) {
  return (
    <button className={`${styles.btn} ${className}`} {...props} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
