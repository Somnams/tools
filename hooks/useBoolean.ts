import { useState } from 'react';
import useMemoizedFn from './usePersistFn';
interface Actions {
    setTrue: () => void;
    setFalse: () => void;
    toggle: (value?: boolean) => void;
}
const useBoolean = (initialValue = false): [boolean, Actions] => {
    const [state, setState] = useState(initialValue);
    const setTrue = useMemoizedFn(() => setState(true));
    const setFalse = useMemoizedFn(() => setState(false));
    const toggle = useMemoizedFn((v?: boolean) => {
        if (typeof v !== 'undefined') {
            setState(v);
            return;
        }
        setState(prev => !prev);
    });
    return [state, { setTrue, setFalse, toggle }];
}

export default useBoolean;