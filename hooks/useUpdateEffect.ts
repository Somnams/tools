import { DependencyList, useEffect, useRef } from "react";
import { Func } from './interface';
import { isFunction } from "./utils";

const useUpdateEffect = <T extends Func = Func>(fn: T, deps: DependencyList) => {
    if (!isFunction(fn) || (deps || []).length === 0) {
        throw Error('params error');
    }
    const mountRef = useRef(false);
    const fnRef = useRef<T>(fn);
    useEffect(() => {
        if (!mountRef.current) {
            mountRef.current = true;
            return;
        }

        return isFunction(fnRef.current) && fnRef.current();
    }, deps);
};

export default useUpdateEffect;