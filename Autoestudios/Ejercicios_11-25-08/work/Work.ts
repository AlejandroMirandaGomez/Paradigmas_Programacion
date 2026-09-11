// import "./dfa.ts"

import { $$ } from "./tools.ts"

// import "./test.ts"

// Ejercicio 1: composition

export type Fun<T> = (x: T) => T

export const id = <T>(x: T): T => x

export const composition = <T>(...funs: Fun<T>[]): Fun<T> => {
    const ultima = funs.at(-1)
    return ultima === undefined
        ? id
        : (x) => ultima(composition(...funs.slice(0, -1))(x))
}

// Ejercicio 2: nand (y and, or, not, nor, xor a partir de nand)

export type Pred<T> = (x: T) => boolean

export const nand =
    <T>(f: Pred<T>, g: Pred<T>): Pred<T> =>
    (x: T) =>
        !(f(x) && g(x))

export const not = <T>(f: Pred<T>): Pred<T> => nand<T>(f, f)

export const and = <T>(f: Pred<T>, g: Pred<T>): Pred<T> =>
    nand(nand(f, g), nand(f, g))

export const or = <T>(f: Pred<T>, g: Pred<T>): Pred<T> => nand(not(f), not(g))

export const nor = <T>(f: Pred<T>, g: Pred<T>): Pred<T> =>
    nand(or(f, g), or(f, g))

export const xor = <T>(f: Pred<T>, g: Pred<T>): Pred<T> =>
    nand(nand(f, nand(f, g)), nand(g, nand(f, g)))

// Ejercicio 3: re_horas (horas validas de 0 a 23, con o sin cero a la izquierda)

export const re_horas = /^([0-1]?\d)$|^([2]?[0-3])$/
