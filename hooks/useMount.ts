import { useEffect } from "react";
import { Func } from "./interface";
import { isFunction } from "./utils";

export const useMount = <T extends Func = Func>(fn: T) => {
    useEffect(() => {
        return isFunction(fn) && fn();
    }, []);
}