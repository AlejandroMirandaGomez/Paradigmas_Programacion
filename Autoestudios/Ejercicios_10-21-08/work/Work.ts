// import "./dfa.ts"

import { $$ } from "./tools.ts"

import "./test.ts"

export type Stats = { max: number; min: number; avg: number }

// Basicos 0: stats
export function stats(a: number[]): Stats {
    const [first] = a
    if (first === undefined)
        throw new Error("stats: el array no puede estar vacío")

    const delta = (acc: Stats, curr: number) => ({
        max: acc.max < curr ? curr : acc.max,
        min: acc.min > curr ? curr : acc.min,
        avg: acc.avg + curr,
    })

    const result = a.reduce(delta, { max: first, min: first, avg: 0 })

    return { ...result, avg: result.avg / a.length }
}

export type Person = { id?: number; name: string }

// Basicos 1: personsWithId
export const personsWithId = (a: Person[]) =>
    a.filter((person) => person.id !== undefined).map((person) => person.name)

export type Producto = string
export type Objeto = { product: Producto; available: boolean }

// Basicos 2: productosDisponibles
export const productosDisponibles = (
    objetos: Objeto[],
    productos: Producto[],
) =>
    productos.filter((p) => objetos.some((o) => o.product === p && o.available))

// Basicos 3: contarElementos
export const contarElementos = (elementos: string[]) =>
    [...new Set(elementos)].reduce(
        (acc, curr: string) => ({
            [curr]: elementos.filter((e) => e === curr).length,
            ...acc,
        }),
        {},
    )

export type Usuario = { user: string; roles: string[] }

// Basicos 4: validarPermisos
export const validarPermisos = (usuarios: Usuario[]) =>
    usuarios.some((u) => u.roles.some((r) => r === "admin"))

export type ObjetoTexto = { value: string }

// Basicos 5: validarFormulario
export const validarFormulario = (
    formulario: ObjetoTexto[],
    min: number,
    max: number,
) => formulario.every((o) => o.value.length >= min && o.value.length <= max)

// Mediano 0: map (simular Array::map con reduce)
export const map = <A, B>(a: A[], f: (x: A) => B): B[] =>
    a.reduce((acc: B[], curr: A) => [...acc, f(curr)], [])

export type Subject = "Basic Math" | "Spanish" | "Programming"

export type Estudiante = { name: string; courses: Subject[] }

// Mediano 1: agrupacionDatos (Map de curso a nombres de estudiantes)
export const agrupacionDatos = (a: Estudiante[]) =>
    a.reduce((m, curr) => {
        curr.courses.forEach((c) =>
            m.set(c, m.get(c) ? [...m.get(c), curr.name] : [curr.name]),
        )
        return m
    }, new Map())

export type Pedido = {
    order_id: string
    items: { product_id: string; quantity: number }[]
}

// Mediano 2: busquedaRelacional (algun pedido con un item que cumple pred)
export const busquedaRelacional = (
    pedidos: Pedido[],
    pred: (q: number) => boolean = (q) => q !== 0,
) => pedidos.some((p) => p.items.some((item) => pred(item.quantity)))

// Recursion 1: quickSort (copia ordenada, sin Array::sort)
export const quickSort = (a: number[]): number[] => {
    const [pivote] = a
    if (pivote === undefined) return a

    return [
        ...quickSort(a.filter((n) => n < pivote)),
        ...a.filter((n) => n === pivote),
        ...quickSort(a.filter((n) => n > pivote)),
    ]
}

// Recursion 2: quickSortGeneralizada (quickSort con comparador)
export const quickSortGeneralizada = <T>(
    a: T[],
    comp: (x: T, y: T) => number,
): T[] => {
    const [pivote] = a
    if (pivote === undefined) return a

    return [
        ...quickSortGeneralizada(
            a.filter((n) => comp(n, pivote) < 0),
            comp,
        ),
        ...a.filter((n) => comp(n, pivote) === 0),
        ...quickSortGeneralizada(
            a.filter((n) => comp(n, pivote) > 0),
            comp,
        ),
    ]
}

// Reto 3: flatten (aplanar un NArray de cualquier profundidad)
export type NArray<T> = Array<T | NArray<T>>

const esSubArray = <T>(e: T | NArray<T>): e is NArray<T> => Array.isArray(e)

export function flatten<T>(arr: NArray<T>): T[] {
    if (arr.every((e): e is T => !esSubArray(e))) return arr

    return flatten(
        arr.reduce<NArray<T>>(
            (acc, curr) => [...acc, ...(esSubArray(curr) ? curr : [curr])],
            [],
        ),
    )
}

// Reto 3 (variante): flatten con profundidad maxima inclusive
export function flattenHasta<T>(arr: NArray<T>, max_depth: number): T[] {
    if (max_depth <= 0) return []

    return arr.reduce<T[]>(
        (acc, curr) => [
            ...acc,
            ...(esSubArray(curr) ? flattenHasta(curr, max_depth - 1) : [curr]),
        ],
        [],
    )
}
