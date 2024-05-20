/**
 * Custom React hook for adding and removing event listeners.
 * 
 * @param {string} event - The event to listen for.
 * @param {Function} handler - The function to call when the event is triggered.
 * 
 * @example
 * const { notify } = useNotification();
 * 
 * notify("Notification message");
 * 
 * @returns {object} An object containing:
 * - notify: Function to send a notification.
*/

import { useEffect } from "react";
export default function useEventListener(event, handler) {
    useEffect(() => {
        window.addEventListener(event, handler)
        return () => window.removeEventListener(event, handler)
    }, [event, handler])
}
