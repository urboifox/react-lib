/**
 * Input Component
 *
 * This component renders a customizable input field with optional label, icon, and error message support.
 *
 * Props:
 * - `label`: string (optional) - The text label associated with the input field.
 * - `icon`: React.ReactNode (optional) - An icon displayed inside the input field, typically used for decorative purposes.
 * - `error`: string (optional) - Error message text that appears below the input field if an error exists.
 * - `type`: HTMLInputTypeAttribute (optional) - Specifies the type of input (e.g., 'text', 'password'). Defaults to 'text'.
 * - `className`: string (optional) - Additional CSS class names that can be applied to the input container for custom styling.
 * - All other props are spread onto the input element itself, allowing for standard HTML input attributes like `name`, `placeholder`, etc.
 * 
 * Features:
 * - The input field supports toggling between 'password' and 'text' types when the `type` prop is set to 'password', facilitated by an eye icon for visibility toggle.
 * - Error handling displays an error icon and message when an error prop is provided.
 * - Customizable through CSS modules, with conditional styling for errors and required fields.
 * 
 * Usage:
 * - Import the `Input` component and use it in your project.
 * - Pass in the `label`, `error`, `icon`, and other props as needed.
 */

import { HTMLInputTypeAttribute, useState } from 'react';
import styles from './Input.module.css';
import icons from '@/lib/icons';

type InputProps = {
    label?: string;
    icon?: React.ReactNode;
    error?: string;
    type?: HTMLInputTypeAttribute;
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({label, className, error, icon, type = "text", ...props}: InputProps) {
  const [inputType, setInputType] = useState(type);
  const toggleType = () => setInputType(prev => prev === 'password' ? 'text' : 'password');

  return (
    <div className={`${styles.input} ${className ?? ""}`}>
        {label && <label htmlFor={props.name} className={`${styles.label} ${props.required ? styles.required : ''}`}>{label}</label>}

        <div className={styles.wrapper}>
          <input type={inputType} className={`${error ? styles.error_input : ''}`} {...props} />
          {
            type === 'password'
            ? (
              <span onClick={toggleType} className={styles.icon}>
                {inputType === 'password' ? icons.eyeSlash : icons.eye}
              </span>
            )
            : icon && <span className={styles.icon}>{icon}</span>
          }
        </div>

        {error && <small className={styles.error}>{icons.infoCircle}{typeof error === 'string' ? error : error[0]}</small>}
    </div>
  )
}