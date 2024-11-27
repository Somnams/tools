type _Partial<T> = {
    [P in keyof T]?: T[P];
};

type _Required<T> = {
    [P in keyof T]-?: T[P];
}

type _Readonly<T> = {
    readonly [P in keyof T]: T[P];
}

type _Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

type _Record<K extends keyof any, T> = {
    [P in K]: T;
};

// * recursive check
type _Exclude<T, U> = T extends U ? never : T;

type _Extract<T, U> = T extends U ? T : never;

type _Omit<T, K extends keyof any> = Pick<T, _Exclude<keyof T, K>>