import { useMemo, useRef } from "react";
import { Func } from "./interface";

function useMemoizedFn<T extends Func = Func>(fn: T): T {
    const fnRef = useRef<T>(fn);
    fnRef.current = useMemo(() => fn, [fn]);

    const memoizedFnRef = useRef<T>();
    if (!memoizedFnRef.current) {
        memoizedFnRef.current = function (...args: any[]) {
            return typeof fnRef.current ? fnRef.current.apply(this, args) : fnRef.current;
        } as T;
    }
    return memoizedFnRef.current;
}

export default useMemoizedFn;