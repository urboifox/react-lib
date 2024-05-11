/**
 * Button Component
 *
 * This component renders a button with customizable styles and behaviors.
 *
 * Props:
 * - `type`: string (optional) - Specifies the button type (e.g., 'button', 'submit', 'reset'). Defaults to 'button'.
 * - `onClick`: function - Callback function that is called when the button is clicked.
 * - `className`: string (optional) - Additional CSS class names that can be applied for custom styling.
 * - `disabled`: boolean (optional) - If true, the button will be disabled.
 * - `children`: React.ReactNode - Content to be rendered inside the button.
 *
 * Features:
 * - Provides a flexible interface for different button styles and actions.
 * - Supports all native button properties through rest parameters.
 *
 * Styling:
 * - Styled using CSS modules, with styles defined in `Button.module.css`.
 * - Supports dynamic class name concatenation for custom styling.
 *
 * Usage:
 * - Import the `Button` component and use it in your project.
 * - Pass in the `onClick`, `children`, and other props as needed.
 */

import styles from './Button.module.css';

export default function Button({ type = 'button', onClick, className, disabled, children, ...props }) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
}
