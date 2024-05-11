/**
 * Textarea component that includes optional label, error handling, and character counter.
 * 
 * Props:
 * - label (optional): The label text for the textarea.
 * - className (optional): Additional CSS classes to apply to the textarea container.
 * - error (optional): Error message to display. Can be a string or an array where the first element is used.
 * - icon (optional): ReactNode element to display as an icon inside the textarea.
 * - props: Standard HTML textarea attributes like name, maxLength, etc.
 * 
 * The component structure includes:
 * - A label element that appears if a label is provided.
 * - A textarea element with conditional styling based on error presence.
 * - An optional icon displayed next to the textarea.
 * - A character counter that appears if maxLength is defined.
 * - An error message display below the textarea if an error is provided.
 * 
 * Usage:
 * - Import the `Textarea` component and use it in your project.
 * - Pass in the `label`, `error`, `icon`, and other props as needed.
 */

import icons from '@/lib/icons';
import styles from './Textarea.module.css';

export default function Textarea({label, className, error, icon, ...props}) {
  return (
    <div className={`${styles.input} ${className || ""}`}>
        {label && <label htmlFor={props.name} className={`${styles.label} ${props.required ? styles.required : ''}`}>{label}</label>}

        <div className={styles.wrapper}>
          <textarea maxLength={props.maxLength} className={`${error ? styles.error_input : ''}`} {...props} />
          { icon && <span className={styles.icon}>{icon}</span> }

          {
            props.maxLength && <small className={styles.counter}>{`${props?.value}`.length} / <span className={styles.max}>{props.maxLength}</span></small>
          }
        </div>

        {error && <small className={styles.error}>{icons.infoCircle}{typeof error === 'string' ? error : error[0]}</small>}
    </div>
  )
}