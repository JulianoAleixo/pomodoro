import { useEffect, useRef } from "react";

export function useInterval<C extends CallableFunction>(
    callback: C,
    delay: number | null
): void {
    const savedCallback = useRef<C | null>(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) return;

        function tick() {
            savedCallback.current?.();
        }

        const id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}
