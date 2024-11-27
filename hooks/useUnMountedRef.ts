import { useRef } from "react"
import { useMount } from "./useMount";

export const useUnMountedRef = () => {
    const unMountedRef = useRef(false);
    useMount(() => {
        unMountedRef.current = false;

        return () => {
            unMountedRef.current = true;
        }
    });
    return unMountedRef;
}