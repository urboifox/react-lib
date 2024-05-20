/**
 * 
 * Custom React hook for handling outside click events.
 * 
 * @param {OutsideClickProps} props - The props for the hook.
 * @param {React.RefObject<HTMLElement>} props.ref - The reference to the element to listen for outside clicks on.
 * @param {() => void} props.handler - The function to call when the outside click is detected.
 * 
 * @example
 * const ref = useRef(null);
 * const handler = () => {
 *   // Handle outside click
 * };
 * 
 * useOutsideClick({ ref, handler });
 * 
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