/**
 * Custom React hook for sending notifications.
 * 
 * @param {string} message - The message to display in the notification.
 * @param {NotificationOptions} options - Optional options object for the notification.
 * 
 * @example
 * const { notify } = useNotification();
 * 
 * notify("Notification message");
 * 
 * @returns {object} An object containing:
 * - notify: Function to send a notification.
 */

export default function useNotification() {

    async function notify(message: string,  options?: NotificationOptions) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            new Notification(message, options);
        }
    }

    return {
        notify
    }
}