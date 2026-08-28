// import "./dfa.ts"

import { $$ } from "./tools.ts"

import "./test.ts"

type Fun<T> = (x: T) => T

const id = <T>(x: T): T => x

const composition = <T>(...funs: Fun<T>[]): Fun<T> => {
    const ultima = funs.at(-1)
    return ultima === undefined
        ? id
        : (x) => ultima(composition(...funs.slice(0, -1))(x))
}
