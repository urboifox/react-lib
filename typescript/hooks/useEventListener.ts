import { useEffect } from "react";

export default function useEventListener(event: keyof WindowEventMap, handler: (e: any) => void) {
    useEffect(() => {
        window.addEventListener(event, handler)
        return () => window.removeEventListener(event, handler)
    }, [event, handler])
}