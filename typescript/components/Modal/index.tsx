/**
 * Modal Component
 *
 * This component renders a modal dialog which can be used to display content or interact with users. It supports animations for opening and closing.
 *
 * Props:
 * - `className`: string (optional) - Additional CSS class names that can be applied for custom styling.
 * - `text`: string - The main text content of the modal.
 * - `onSubmit`: (e: React.MouseEvent) => void - Function to call when the submit button is clicked.
 * - `onCancel`: () => void (optional) - Function to call when the cancel button is clicked.
 * - `visible`: boolean (optional) - Controls the visibility of the modal. If true, the modal is shown.
 * - `submitText`: string (optional) - Text to display on the submit button. Defaults to "Confirm".
 * - `children`: React.ReactNode (optional) - Additional content to be rendered in the modal.
 * - All other props are spread onto the motion.div element, allowing for custom animation properties.
 *
 * Features:
 * - Uses `createPortal` from `react-dom` to render the modal as a child of the body element, ensuring it is on top of other content.
 * - Utilizes `AnimatePresence` and `motion.div` from `framer-motion` for smooth animations on open and close.
 * - Conditionally renders children and buttons based on the provided props.
 *
 * Styling:
 * - Styled using CSS modules, with styles defined in `Modal.module.css`.
 * - Supports dynamic class name concatenation for custom styling.
 * 
 * Usage:
 * - Import the `Modal` component and use it in your project.
 * - Pass in the `text`, `onSubmit`, and other props as needed.
 */

import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import Button from "../Button";
import {AnimatePresence, HTMLMotionProps, motion} from 'framer-motion';

type ModalProps = {
    className?: string;
    text: string;
    onSubmit: (e: React.MouseEvent) => void;
    onCancel?: () => void;
    visible?: boolean;
    submitText?: string;
    children?: React.ReactNode;
} & HTMLMotionProps<"div">;

export default function Modal({visible, text, submitText, onSubmit, onCancel, className, children, ...props}: ModalProps) {
  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(2px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.15 }}
          {...props}
          className={`${styles.container} ${className}`}
        >
          <div className={styles.modal}>
            {text && <div className={styles.text}>{text}</div>}

            {
              children && (
                <div className={styles.children}>
                  {children}
                </div>
              )
            }

            <div className={styles.actions}>
              <Button onClick={onCancel}>Cancel</Button>
              <Button variant="secondary" color="error" onClick={onSubmit}>
                {submitText || "Confirm"}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
