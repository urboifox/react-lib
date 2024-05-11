/**
 * Custom React hook for tracking window size changes.
 * 
 * This hook initializes with the current window's innerWidth and innerHeight and updates these values whenever the window is resized.
 * 
 * @returns {object} An object containing:
 * - width: Current width of the window.
 * - height: Current height of the window.
 * 
 * @example
 * const { width, height } = useScreenSize();
 * 
 * return (
 *   <div>
 *     <p>Current window width: {width}px</p>
 *     <p>Current window height: {height}px</p>
 *   </div>
 * );
 */

import { useState, useEffect } from 'react';

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Function to update state on window resize
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
}