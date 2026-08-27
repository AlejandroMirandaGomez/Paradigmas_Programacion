import { $$ } from "./tools.ts"

// import "./test.ts"

// import "./dfa.ts"

$$("Ejercicios_10-21-08")

type Stats = { max: number; min: number; avg: number }

// Basicos 0: stats
function stats(a: number[]): Stats {
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

type Person = { id?: number; name: string }

// Basicos 1: personsWithId
const personsWithId = (a: Person[]) =>
    a.filter((person) => person.id !== undefined).map((person) => person.name)

type Producto = string
type Objeto = { product: Producto; available: boolean }

// Basicos 2: productosDisponibles
const productosDisponibles = (objetos: Objeto[], productos: Producto[]) =>
    productos.filter((p) => objetos.some((o) => o.product === p && o.available))

// Basicos 3: contarElementos
const contarElementos = (elementos: string[]) =>
    [...new Set(elementos)].reduce(
        (acc, curr: string) => ({
            [curr]: elementos.filter((e) => e === curr).length,
            ...acc,
        }),
        {},
    )

type Usuario = { user: string; roles: string[] }

// Basicos 4: validarPermisos
const validarPermisos = (usuarios: Usuario[]) =>
    usuarios.some((u) => u.roles.some((r) => r === "admin"))

type ObjetoTexto = { value: string }

// Basicos 5: validarFormulario
const validarFormulario = (
    formulario: ObjetoTexto[],
    min: number,
    max: number,
) => formulario.every((o) => o.value.length >= min && o.value.length <= max)

// ===========================================================
// Basicos 0: stats (max, min, avg en una sola pasada)
// ===========================================================

$$("__".repeat(20))
$$("Basicos 0: stats")

$$("caso normal      ", stats([1, 2, 3]))
$$("un solo elemento ", stats([42]))
$$("todos negativos  ", stats([-5, -1, -10]))
$$("desordenado      ", stats([3, 1, 4, 1, 5, 9, 2, 6]))
$$("con decimales    ", stats([1.5, 2.5]))
$$("con repetidos    ", stats([7, 7, 7]))

try {
    stats([])
    $$("array vacio       FALLO: no lanzo Error")
} catch (e) {
    $$("array vacio      ", (e as Error).message)
}

// ===========================================================
// Basicos 1: personsWithId (nombres de personas con id definido)
// ===========================================================

$$("__".repeat(20))
$$("Basicos 1: personsWithId")

$$(
    "mixto            ",
    personsWithId([{ id: 123, name: "Julian" }, { name: "Alejandro" }]),
    "esperado [Julian]",
)
$$(
    "todos con id     ",
    personsWithId([
        { id: 1, name: "Ana" },
        { id: 2, name: "Beto" },
    ]),
    "esperado [Ana, Beto]",
)
$$(
    "ninguno con id   ",
    personsWithId([{ name: "Ana" }, { name: "Beto" }]),
    "esperado []",
)
$$(
    "id cero          ",
    personsWithId([
        { id: 0, name: "Cero" },
        { id: 5, name: "Cinco" },
    ]),
    "esperado [Cero, Cinco]",
)
$$(
    "id negativo      ",
    personsWithId([{ id: -1, name: "Neg" }]),
    "esperado [Neg]",
)
$$("array vacio      ", personsWithId([]), "esperado []")
$$(
    "nombre repetido  ",
    personsWithId([
        { id: 1, name: "Ana" },
        { id: 2, name: "Ana" },
    ]),
    "esperado [Ana, Ana]",
)

// ===========================================================
// Basicos 2: productosDisponibles (filtrar por propiedad)
// ===========================================================

$$("__".repeat(20))
$$("Basicos 2: productosDisponibles")

const objetos: Objeto[] = [
    { product: "manzana", available: true },
    { product: "pan", available: false },
    { product: "leche", available: true },
]

$$(
    "mixto            ",
    productosDisponibles(objetos, ["manzana", "pan", "leche"]),
    "esperado [manzana, leche]",
)
$$(
    "todos disponibles",
    productosDisponibles(objetos, ["manzana", "leche"]),
    "esperado [manzana, leche]",
)
$$("ninguno disponible", productosDisponibles(objetos, ["pan"]), "esperado []")
$$(
    "producto inexistente",
    productosDisponibles(objetos, ["queso"]),
    "esperado []",
)
$$("lista de productos vacia", productosDisponibles(objetos, []), "esperado []")
$$("objetos vacio    ", productosDisponibles([], ["manzana"]), "esperado []")
$$(
    "producto repetido",
    productosDisponibles(objetos, ["manzana", "manzana"]),
    "esperado [manzana, manzana]",
)

// ===========================================================
// Basicos 3: contarElementos (contar elementos con condicion)
// ===========================================================

$$("__".repeat(20))
$$("Basicos 3: contarElementos")

$$(
    "caso normal      ",
    contarElementos(["red", "blue", "red", "green", "red"]),
    "esperado { red: 3, blue: 1, green: 1 }",
)
$$("un solo elemento ", contarElementos(["red"]), "esperado { red: 1 }")
$$(
    "todos iguales    ",
    contarElementos(["red", "red", "red"]),
    "esperado { red: 3 }",
)
$$(
    "todos distintos  ",
    contarElementos(["red", "blue", "green"]),
    "esperado { red: 1, blue: 1, green: 1 }",
)
$$("array vacio      ", contarElementos([]), "esperado {}")

// ===========================================================
// Basicos 4: validarPermisos (al menos un usuario con rol admin)
// ===========================================================

$$("__".repeat(20))
$$("Basicos 4: validarPermisos")

$$(
    "un admin entre varios",
    validarPermisos([
        { user: "ana", roles: ["editor"] },
        { user: "beto", roles: ["admin"] },
    ]),
    "esperado true",
)
$$(
    "ningun admin     ",
    validarPermisos([
        { user: "ana", roles: ["editor"] },
        { user: "beto", roles: ["lector", "editor"] },
    ]),
    "esperado false",
)
$$(
    "admin entre varios roles",
    validarPermisos([{ user: "ana", roles: ["lector", "admin", "editor"] }]),
    "esperado true",
)
$$(
    "todos admin      ",
    validarPermisos([
        { user: "ana", roles: ["admin"] },
        { user: "beto", roles: ["admin"] },
    ]),
    "esperado true",
)
$$(
    "roles vacios     ",
    validarPermisos([
        { user: "ana", roles: [] },
        { user: "beto", roles: [] },
    ]),
    "esperado false",
)
$$("usuarios vacio   ", validarPermisos([]), "esperado false")
$$(
    "rol parecido no cuenta",
    validarPermisos([{ user: "ana", roles: ["administrador", "Admin"] }]),
    "esperado false",
)

// ===========================================================
// Basicos 5: validarFormulario (largo de todos los campos en [min, max])
// ===========================================================

$$("__".repeat(20))
$$("Basicos 5: validarFormulario")

const formulario: ObjetoTexto[] = [
    { value: "ana" },
    { value: "beto" },
    { value: "carla" },
]

$$("todos en rango   ", validarFormulario(formulario, 3, 5), "esperado true")
$$(
    "uno muy corto    ",
    validarFormulario([{ value: "ana" }, { value: "be" }], 3, 5),
    "esperado false",
)
$$(
    "uno muy largo    ",
    validarFormulario([{ value: "ana" }, { value: "beto1234" }], 3, 5),
    "esperado false",
)
$$(
    "limite inferior inclusive",
    validarFormulario([{ value: "abc" }], 3, 5),
    "esperado true",
)
$$(
    "limite superior inclusive",
    validarFormulario([{ value: "abcde" }], 3, 5),
    "esperado true",
)
$$(
    "campo vacio con min 0",
    validarFormulario([{ value: "" }], 0, 5),
    "esperado true",
)
$$(
    "campo vacio con min 1",
    validarFormulario([{ value: "" }], 1, 5),
    "esperado false",
)
$$("formulario vacio ", validarFormulario([], 3, 5), "esperado true")
$$(
    "rango imposible min > max",
    validarFormulario(formulario, 5, 3),
    "esperado false",
)
$$(
    "espacios cuentan como largo",
    validarFormulario([{ value: "   " }], 3, 5),
    "esperado true",
)
