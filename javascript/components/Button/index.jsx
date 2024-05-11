/**
 * Button Component
 * 
 * This component renders a customizable button.
 * 
 * Props:
 * - `children`: React.ReactNode - The content to be displayed inside the button.
 * - `iconOnly`: boolean (optional) - If true, the button will be styled specifically for icons.
 * - `beforeContent`: React.ReactNode (optional) - Content to render before the main children.
 * - `afterContent`: React.ReactNode (optional) - Content to render after the main children.
 * - `size`: "sm" | "md" | "lg" (optional) - The size of the button. Can be 'sm', 'md', or 'lg'.
 * - `active`: boolean (optional) - If true, applies an 'active' style to the button.
 * - `disabled`: boolean (optional) - If true, the button will be disabled and non-interactive.
 * - `variant`: "primary" | "secondary" (optional) - The style variant of the button. Defaults to 'primary'.
 * - `color`: "primary" | "success" | "info" | "warning" | "error" (optional) - The color theme of the button. Defaults to 'primary'.
 * - `className`: string (optional) - Additional custom class names to apply to the button.
 * 
 * The button's class names are dynamically generated based on its props to apply various predefined styles and conditions.
 * 
 * Usage:
 * - Import the `Button` component and use it in your project.
 * - Pass in the `children`, `iconOnly`, `beforeContent`, `afterContent`, `size`, `active`, `disabled`, `variant`, and `color` props as needed.
 */

import styles from "./Button.module.css";

export default function Button({ active, disabled, className = "", iconOnly, beforeContent, afterContent, size, variant = "primary", color = "primary", children, ...props }) {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[variant]}
        ${iconOnly ? styles.icon_only : ""}
        ${styles[`color-${color}`]}
        ${size ? styles[size] : ""}
        ${disabled ? styles.disabled : ""}
        ${active ? styles.active : ""}
        ${className}
      `}

      disabled={disabled}

      {...props}
    >
      {beforeContent && beforeContent}

      {children}

      {afterContent && afterContent}
    </button>
  );
}
