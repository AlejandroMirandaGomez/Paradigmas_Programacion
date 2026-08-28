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
