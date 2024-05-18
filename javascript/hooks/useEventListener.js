import { useEffect } from "react";

export default function useEventListener(event, handler) {
    useEffect(() => {
        window.addEventListener(event, handler)
        return () => window.removeEventListener(event, handler)
    }, [event, handler])
}
