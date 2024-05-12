/**
 * useOutsideClick Hook
 *
 * This hook allows you to detect clicks outside of a specified DOM element and execute a handler function in response.
 * It is useful for closing modal windows, dropdown menus, or resetting states when the user interacts with the rest of the application.
 *
 * Props:
 * - `ref`: React.RefObject<HTMLElement> - A ref object pointing to the element to monitor for outside clicks.
 * - `handler`: () => void - A function to execute when a click outside the specified element is detected.
 *
 * Usage:
 * 1. Import the hook into your component.
 * 2. Create a ref using `useRef` and attach it to the element you want to monitor.
 * 3. Define a handler function that should be executed when a click outside the element occurs.
 * 4. Call `useOutsideClick`, passing the ref and handler as arguments.
 *
 * Example:
 * ```javascript
 * import React, { useRef } from 'react';
 * import useOutsideClick from './hooks/useOutsideClick';
 *
 * function Dropdown() {
 *   const dropdownRef = useRef(null);
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   const closeDropdown = () => setIsOpen(false);
 *
 *   useOutsideClick({
 *     ref: dropdownRef,
 *     handler: closeDropdown
 *   });
 *
 *   return (
 *     <div ref={dropdownRef}>
 *       {isOpen && (
 *         <div>
 *           Dropdown Content
 *         </div>
 *       )}
 *       <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * Notes:
 * - Ensure the element with the attached ref is mounted in the DOM before initializing the hook to avoid errors.
 * - The hook uses the `mousedown` event to detect outside clicks. This can be customized to `mouseup` or other events as needed.
 */
import { useEffect } from 'react';

interface OutsideClickProps {
  ref: React.RefObject<HTMLElement>;
  handler: () => void;
}

const useOutsideClick = ({ ref, handler }: OutsideClickProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
};

export default useOutsideClick;