import { test, describe } from "node:test"
import assert from "node:assert/strict"
import {
    agrupacionDatos,
    busquedaRelacional,
    contarElementos,
    flatten,
    flattenHasta,
    map,
    personsWithId,
    productosDisponibles,
    quickSort,
    quickSortGeneralizada,
    stats,
    validarFormulario,
    validarPermisos,
    type Estudiante,
    type NArray,
    type Objeto,
    type Pedido,
    type ObjetoTexto,
} from "./Work.ts"

// ===========================================================
// Basicos 0: stats (max, min, avg en una sola pasada)
// ===========================================================

describe("Basicos 0: stats", () => {
    test("caso normal", () => {
        assert.deepEqual(stats([1, 2, 3]), { max: 3, min: 1, avg: 2 })
    })

    test("un solo elemento", () => {
        assert.deepEqual(stats([42]), { max: 42, min: 42, avg: 42 })
    })

    test("todos negativos", () => {
        assert.deepEqual(stats([-5, -1, -10]), {
            max: -1,
            min: -10,
            avg: -16 / 3,
        })
    })

    test("desordenado", () => {
        assert.deepEqual(stats([3, 1, 4, 1, 5, 9, 2, 6]), {
            max: 9,
            min: 1,
            avg: 3.875,
        })
    })

    test("con decimales", () => {
        assert.deepEqual(stats([1.5, 2.5]), { max: 2.5, min: 1.5, avg: 2 })
    })

    test("con repetidos", () => {
        assert.deepEqual(stats([7, 7, 7]), { max: 7, min: 7, avg: 7 })
    })

    test("array vacio lanza Error", () => {
        assert.throws(() => stats([]), /no puede estar vacío/)
    })
})

// ===========================================================
// Basicos 1: personsWithId (nombres de personas con id definido)
// ===========================================================

describe("Basicos 1: personsWithId", () => {
    test("mixto", () => {
        assert.deepEqual(
            personsWithId([{ id: 123, name: "Julian" }, { name: "Alejandro" }]),
            ["Julian"],
        )
    })

    test("todos con id", () => {
        assert.deepEqual(
            personsWithId([
                { id: 1, name: "Ana" },
                { id: 2, name: "Beto" },
            ]),
            ["Ana", "Beto"],
        )
    })

    test("ninguno con id", () => {
        assert.deepEqual(personsWithId([{ name: "Ana" }, { name: "Beto" }]), [])
    })

    test("id cero cuenta como definido", () => {
        assert.deepEqual(
            personsWithId([
                { id: 0, name: "Cero" },
                { id: 5, name: "Cinco" },
            ]),
            ["Cero", "Cinco"],
        )
    })

    test("id negativo cuenta como definido", () => {
        assert.deepEqual(personsWithId([{ id: -1, name: "Neg" }]), ["Neg"])
    })

    test("array vacio", () => {
        assert.deepEqual(personsWithId([]), [])
    })

    test("nombre repetido no se deduplica", () => {
        assert.deepEqual(
            personsWithId([
                { id: 1, name: "Ana" },
                { id: 2, name: "Ana" },
            ]),
            ["Ana", "Ana"],
        )
    })
})

// ===========================================================
// Basicos 2: productosDisponibles (filtrar por propiedad)
// ===========================================================

describe("Basicos 2: productosDisponibles", () => {
    const objetos: Objeto[] = [
        { product: "manzana", available: true },
        { product: "pan", available: false },
        { product: "leche", available: true },
    ]

    test("mixto", () => {
        assert.deepEqual(
            productosDisponibles(objetos, ["manzana", "pan", "leche"]),
            ["manzana", "leche"],
        )
    })

    test("todos disponibles", () => {
        assert.deepEqual(productosDisponibles(objetos, ["manzana", "leche"]), [
            "manzana",
            "leche",
        ])
    })

    test("ninguno disponible", () => {
        assert.deepEqual(productosDisponibles(objetos, ["pan"]), [])
    })

    test("producto inexistente", () => {
        assert.deepEqual(productosDisponibles(objetos, ["queso"]), [])
    })

    test("lista de productos vacia", () => {
        assert.deepEqual(productosDisponibles(objetos, []), [])
    })

    test("objetos vacio", () => {
        assert.deepEqual(productosDisponibles([], ["manzana"]), [])
    })

    test("producto repetido se conserva", () => {
        assert.deepEqual(
            productosDisponibles(objetos, ["manzana", "manzana"]),
            ["manzana", "manzana"],
        )
    })
})

// ===========================================================
// Basicos 3: contarElementos (contar elementos con condicion)
// ===========================================================

describe("Basicos 3: contarElementos", () => {
    test("caso normal", () => {
        assert.deepEqual(
            contarElementos(["red", "blue", "red", "green", "red"]),
            { red: 3, blue: 1, green: 1 },
        )
    })

    test("un solo elemento", () => {
        assert.deepEqual(contarElementos(["red"]), { red: 1 })
    })

    test("todos iguales", () => {
        assert.deepEqual(contarElementos(["red", "red", "red"]), { red: 3 })
    })

    test("todos distintos", () => {
        assert.deepEqual(contarElementos(["red", "blue", "green"]), {
            red: 1,
            blue: 1,
            green: 1,
        })
    })

    test("array vacio", () => {
        assert.deepEqual(contarElementos([]), {})
    })
})

// ===========================================================
// Basicos 4: validarPermisos (al menos un usuario con rol admin)
// ===========================================================

describe("Basicos 4: validarPermisos", () => {
    test("un admin entre varios", () => {
        assert.equal(
            validarPermisos([
                { user: "ana", roles: ["editor"] },
                { user: "beto", roles: ["admin"] },
            ]),
            true,
        )
    })

    test("ningun admin", () => {
        assert.equal(
            validarPermisos([
                { user: "ana", roles: ["editor"] },
                { user: "beto", roles: ["lector", "editor"] },
            ]),
            false,
        )
    })

    test("admin entre varios roles", () => {
        assert.equal(
            validarPermisos([
                { user: "ana", roles: ["lector", "admin", "editor"] },
            ]),
            true,
        )
    })

    test("todos admin", () => {
        assert.equal(
            validarPermisos([
                { user: "ana", roles: ["admin"] },
                { user: "beto", roles: ["admin"] },
            ]),
            true,
        )
    })

    test("roles vacios", () => {
        assert.equal(
            validarPermisos([
                { user: "ana", roles: [] },
                { user: "beto", roles: [] },
            ]),
            false,
        )
    })

    test("usuarios vacio", () => {
        assert.equal(validarPermisos([]), false)
    })

    test("rol parecido no cuenta", () => {
        assert.equal(
            validarPermisos([
                { user: "ana", roles: ["administrador", "Admin"] },
            ]),
            false,
        )
    })
})

// ===========================================================
// Basicos 5: validarFormulario (largo de todos los campos en [min, max])
// ===========================================================

describe("Basicos 5: validarFormulario", () => {
    const formulario: ObjetoTexto[] = [
        { value: "ana" },
        { value: "beto" },
        { value: "carla" },
    ]

    test("todos en rango", () => {
        assert.equal(validarFormulario(formulario, 3, 5), true)
    })

    test("uno muy corto", () => {
        assert.equal(
            validarFormulario([{ value: "ana" }, { value: "be" }], 3, 5),
            false,
        )
    })

    test("uno muy largo", () => {
        assert.equal(
            validarFormulario([{ value: "ana" }, { value: "beto1234" }], 3, 5),
            false,
        )
    })

    test("limite inferior inclusive", () => {
        assert.equal(validarFormulario([{ value: "abc" }], 3, 5), true)
    })

    test("limite superior inclusive", () => {
        assert.equal(validarFormulario([{ value: "abcde" }], 3, 5), true)
    })

    test("campo vacio con min 0", () => {
        assert.equal(validarFormulario([{ value: "" }], 0, 5), true)
    })

    test("campo vacio con min 1", () => {
        assert.equal(validarFormulario([{ value: "" }], 1, 5), false)
    })

    test("formulario vacio es verdad vacua", () => {
        assert.equal(validarFormulario([], 3, 5), true)
    })

    test("rango imposible min > max", () => {
        assert.equal(validarFormulario(formulario, 5, 3), false)
    })

    test("espacios cuentan como largo", () => {
        assert.equal(validarFormulario([{ value: "   " }], 3, 5), true)
    })
})

// ===========================================================
// Mediano 0: map (simular Array::map con reduce)
// ===========================================================

describe("Mediano 0: map", () => {
    test("cuadrados", () => {
        assert.deepEqual(
            map([1, 2, 3], (x) => x ** 2),
            [1, 4, 9],
        )
    })

    test("cambio de tipo", () => {
        assert.deepEqual(
            map([1, 2, 3], (x) => `n${x}`),
            ["n1", "n2", "n3"],
        )
    })

    test("array vacio", () => {
        assert.deepEqual(
            map([] as number[], (x) => x),
            [],
        )
    })

    test("un solo elemento", () => {
        assert.deepEqual(
            map([5], (x) => x + 1),
            [6],
        )
    })

    test("identidad", () => {
        assert.deepEqual(
            map([1, 2, 3], (x) => x),
            [1, 2, 3],
        )
    })

    test("usa el valor no el indice", () => {
        assert.deepEqual(
            map(["a", "b"], (x) => x.toUpperCase()),
            ["A", "B"],
        )
    })

    // map(a, f) == a.map(f) para todo a y f
    const equivaleANativo = <A, B>(a: A[], f: (x: A) => B) =>
        assert.deepEqual(map(a, f), a.map(f))

    test("equivale a Array::map con numeros", () => {
        equivaleANativo([1, 2, 3], (x) => x ** 2)
    })

    test("equivale a Array::map con strings", () => {
        equivaleANativo(["a", "b"], (x) => x.toUpperCase())
    })

    test("equivale a Array::map con array vacio", () => {
        equivaleANativo([] as number[], (x) => x)
    })

    test("f que retorna arrays no debe aplanar", () => {
        equivaleANativo([1, 2, 3], (x) => [x])
        assert.deepEqual(
            map([1, 2, 3], (x) => [x]),
            [[1], [2], [3]],
        )
    })
})

// ===========================================================
// Mediano 1: agrupacionDatos (Map de curso a nombres de estudiantes)
// ===========================================================

describe("Mediano 1: agrupacionDatos", () => {
    const ale: Estudiante = {
        name: "Ale",
        courses: ["Spanish", "Programming"],
    }
    const keylor: Estudiante = {
        name: "Keylor",
        courses: ["Basic Math", "Programming"],
    }
    const nando: Estudiante = { name: "Nando", courses: ["Basic Math"] }

    test("caso normal", () => {
        assert.deepEqual(
            agrupacionDatos([ale, keylor, nando]),
            new Map([
                ["Spanish", ["Ale"]],
                ["Programming", ["Ale", "Keylor"]],
                ["Basic Math", ["Keylor", "Nando"]],
            ]),
        )
    })

    test("un estudiante aparece en todos sus cursos", () => {
        assert.deepEqual(
            agrupacionDatos([ale]),
            new Map([
                ["Spanish", ["Ale"]],
                ["Programming", ["Ale"]],
            ]),
        )
    })

    test("array de estudiantes vacio", () => {
        assert.deepEqual(agrupacionDatos([]), new Map())
    })

    test("estudiante sin cursos no crea llaves", () => {
        assert.deepEqual(
            agrupacionDatos([{ name: "X", courses: [] }]),
            new Map(),
        )
    })

    test("solo llaves de cursos que alguien lleva", () => {
        assert.deepEqual([...agrupacionDatos([nando]).keys()], ["Basic Math"])
    })

    test("conserva el orden de llegada de los estudiantes", () => {
        assert.deepEqual(agrupacionDatos([nando, keylor]).get("Basic Math"), [
            "Nando",
            "Keylor",
        ])
    })

    test("homonimos no se deduplican", () => {
        assert.deepEqual(
            agrupacionDatos([
                { name: "Ana", courses: ["Spanish"] },
                { name: "Ana", courses: ["Spanish"] },
            ]).get("Spanish"),
            ["Ana", "Ana"],
        )
    })

    test("curso repetido en un mismo estudiante lo cuenta dos veces", () => {
        assert.deepEqual(
            agrupacionDatos([
                { name: "Ana", courses: ["Spanish", "Spanish"] },
            ]).get("Spanish"),
            ["Ana", "Ana"],
        )
    })

    test("no muta los estudiantes de entrada", () => {
        const entrada: Estudiante[] = [{ name: "Ana", courses: ["Spanish"] }]
        agrupacionDatos(entrada)
        assert.deepEqual(entrada, [{ name: "Ana", courses: ["Spanish"] }])
    })
})

// ===========================================================
// Mediano 2: busquedaRelacional (algun pedido con un item que cumple pred)
// ===========================================================

describe("Mediano 2: busquedaRelacional", () => {
    const pedidos: Pedido[] = [
        {
            order_id: "A",
            items: [
                { product_id: "manzana", quantity: 0 },
                { product_id: "pan", quantity: 3 },
            ],
        },
        {
            order_id: "B",
            items: [{ product_id: "leche", quantity: 12 }],
        },
    ]

    const distintoDeCero = (q: number) => q !== 0

    test("hay un item que cumple", () => {
        assert.equal(busquedaRelacional(pedidos, distintoDeCero), true)
    })

    test("ningun item cumple", () => {
        assert.equal(
            busquedaRelacional(pedidos, (q) => q > 100),
            false,
        )
    })

    test("el pred decide, no la cantidad en si", () => {
        assert.equal(
            busquedaRelacional(pedidos, (q) => q === 0),
            true,
        )
    })

    test("basta un item en un solo pedido", () => {
        assert.equal(
            busquedaRelacional(pedidos, (q) => q === 12),
            true,
        )
    })

    test("array de pedidos vacio", () => {
        assert.equal(busquedaRelacional([], distintoDeCero), false)
    })

    test("pedido sin items", () => {
        assert.equal(
            busquedaRelacional([{ order_id: "A", items: [] }], distintoDeCero),
            false,
        )
    })

    test("todos los items en cero", () => {
        assert.equal(
            busquedaRelacional(
                [
                    {
                        order_id: "A",
                        items: [{ product_id: "pan", quantity: 0 }],
                    },
                ],
                distintoDeCero,
            ),
            false,
        )
    })

    test("cantidad negativa es distinta de cero", () => {
        assert.equal(
            busquedaRelacional(
                [
                    {
                        order_id: "A",
                        items: [{ product_id: "pan", quantity: -5 }],
                    },
                ],
                distintoDeCero,
            ),
            true,
        )
    })

    test("pred que siempre da false", () => {
        assert.equal(
            busquedaRelacional(pedidos, () => false),
            false,
        )
    })

    test("sin pred usa cantidad distinta de cero", () => {
        assert.equal(busquedaRelacional(pedidos), true)
    })

    test("sin pred: todos en cero da false", () => {
        assert.equal(
            busquedaRelacional([
                {
                    order_id: "A",
                    items: [
                        { product_id: "pan", quantity: 0 },
                        { product_id: "leche", quantity: 0 },
                    ],
                },
            ]),
            false,
        )
    })

    test("sin pred: cantidad negativa cuenta", () => {
        assert.equal(
            busquedaRelacional([
                {
                    order_id: "A",
                    items: [{ product_id: "pan", quantity: -5 }],
                },
            ]),
            true,
        )
    })

    test("sin pred: pedidos vacio", () => {
        assert.equal(busquedaRelacional([]), false)
    })

    test("el default equivale a pasarlo explicito", () => {
        assert.equal(
            busquedaRelacional(pedidos),
            busquedaRelacional(pedidos, distintoDeCero),
        )
    })
})

// ===========================================================
// Recursion 1: quickSort (copia ordenada, sin Array::sort)
// ===========================================================

describe("Recursion 1: quickSort", () => {
    test("caso normal", () => {
        assert.deepEqual(quickSort([3, 6, 1, 8, 2]), [1, 2, 3, 6, 8])
    })

    test("array vacio", () => {
        assert.deepEqual(quickSort([]), [])
    })

    test("un solo elemento", () => {
        assert.deepEqual(quickSort([9]), [9])
    })

    test("ya ordenado (peor caso del pivote)", () => {
        assert.deepEqual(quickSort([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    })

    test("orden inverso", () => {
        assert.deepEqual(quickSort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5])
    })

    test("conserva los duplicados del pivote", () => {
        assert.deepEqual(quickSort([5, 5, 3]), [3, 5, 5])
    })

    test("todos iguales", () => {
        assert.deepEqual(quickSort([7, 7, 7]), [7, 7, 7])
    })

    test("duplicados mezclados", () => {
        assert.deepEqual(quickSort([4, 4, 1, 4, 2]), [1, 2, 4, 4, 4])
    })

    test("negativos y cero", () => {
        assert.deepEqual(quickSort([-3, 0, -1, 2]), [-3, -1, 0, 2])
    })

    test("decimales", () => {
        assert.deepEqual(quickSort([1.5, -2.5, 0.5]), [-2.5, 0.5, 1.5])
    })

    test("no muta el array original", () => {
        const original = [3, 1, 2]
        quickSort(original)
        assert.deepEqual(original, [3, 1, 2])
    })

    test("devuelve una copia, no la misma referencia", () => {
        const original = [2, 1]
        assert.notEqual(quickSort(original), original)
    })

    // quickSort(a) == [...a].sort(numerico) para todo a
    const azar = () =>
        Array.from({ length: 40 }, () => Math.floor(Math.random() * 10))

    test("equivale a Array::sort en 200 arrays al azar", () => {
        for (let i = 0; i < 200; i++) {
            const a = azar()
            assert.deepEqual(
                quickSort(a),
                [...a].sort((x, y) => x - y),
            )
        }
    })
})

// ===========================================================
// Recursion 2: quickSortGeneralizada (quickSort con comparador)
// ===========================================================

describe("Recursion 2: quickSortGeneralizada", () => {
    const ascendente = (x: number, y: number) => x - y
    const descendente = (x: number, y: number) => y - x
    const alfabetico = (x: string, y: string) => x.localeCompare(y)

    test("numeros ascendente", () => {
        assert.deepEqual(
            quickSortGeneralizada([3, 6, 1, 8, 2], ascendente),
            [1, 2, 3, 6, 8],
        )
    })

    test("el comparador invierte el orden", () => {
        assert.deepEqual(
            quickSortGeneralizada([3, 6, 1, 8, 2], descendente),
            [8, 6, 3, 2, 1],
        )
    })

    test("array vacio", () => {
        assert.deepEqual(quickSortGeneralizada([], ascendente), [])
    })

    test("un solo elemento", () => {
        assert.deepEqual(quickSortGeneralizada([9], ascendente), [9])
    })

    test("conserva los equivalentes", () => {
        assert.deepEqual(
            quickSortGeneralizada([4, 4, 1, 4, 2], ascendente),
            [1, 2, 4, 4, 4],
        )
    })

    test("todos equivalentes", () => {
        assert.deepEqual(
            quickSortGeneralizada([7, 7, 7], ascendente),
            [7, 7, 7],
        )
    })

    test("strings", () => {
        assert.deepEqual(
            quickSortGeneralizada(["pera", "ana", "kiwi"], alfabetico),
            ["ana", "kiwi", "pera"],
        )
    })

    test("objetos por un campo", () => {
        const gente = [
            { name: "Ana", edad: 30 },
            { name: "Beto", edad: 25 },
            { name: "Dani", edad: 20 },
        ]
        assert.deepEqual(
            quickSortGeneralizada(gente, (x, y) => x.edad - y.edad).map(
                (p) => p.name,
            ),
            ["Dani", "Beto", "Ana"],
        )
    })

    test("comparador constante deja el orden original", () => {
        assert.deepEqual(
            quickSortGeneralizada([3, 1, 2], () => 0),
            [3, 1, 2],
        )
    })

    test("no muta el array original", () => {
        const original = [3, 1, 2]
        quickSortGeneralizada(original, ascendente)
        assert.deepEqual(original, [3, 1, 2])
    })

    test("devuelve una copia, no la misma referencia", () => {
        const original = [2, 1]
        assert.notEqual(quickSortGeneralizada(original, ascendente), original)
    })

    test("generaliza a quickSort con el comparador numerico", () => {
        for (let i = 0; i < 200; i++) {
            const a = Array.from({ length: 40 }, () =>
                Math.floor(Math.random() * 10),
            )
            assert.deepEqual(quickSortGeneralizada(a, ascendente), quickSort(a))
        }
    })
})

// ===========================================================
// Reto 3: flatten (aplanar un NArray de cualquier profundidad)
// ===========================================================

describe("Reto 3: flatten", () => {
    test("ejemplo del enunciado", () => {
        assert.deepEqual(
            flatten([0, [[[1]]], [2, [3], [4, [5]]], [], [[6]], [[], 7]]),
            [0, 1, 2, 3, 4, 5, 6, 7],
        )
    })

    test("array vacio", () => {
        assert.deepEqual(flatten([]), [])
    })

    test("ya plano lo devuelve igual", () => {
        assert.deepEqual(flatten([1, 2, 3]), [1, 2, 3])
    })

    test("un solo nivel de anidamiento", () => {
        assert.deepEqual(flatten([[1], [2], [3]]), [1, 2, 3])
    })

    test("anidamiento profundo de un solo elemento", () => {
        assert.deepEqual(flatten([[[[[9]]]]]), [9])
    })

    test("arrays vacios anidados desaparecen", () => {
        assert.deepEqual(flatten([[], [[]], [[[]]]]), [])
    })

    test("anidamiento escalonado", () => {
        assert.deepEqual(
            flatten([1, [2, [3, [4, [5, [6]]]]]]),
            [1, 2, 3, 4, 5, 6],
        )
    })

    test("conserva el orden de izquierda a derecha", () => {
        assert.deepEqual(flatten([[3], 1, [[2]]]), [3, 1, 2])
    })

    test("conserva valores falsy", () => {
        const falsy: NArray<number | boolean | string | null> = [
            [0, false],
            [""],
            [null],
        ]
        assert.deepEqual(flatten(falsy), [0, false, "", null])
    })

    test("conserva duplicados", () => {
        assert.deepEqual(flatten([1, [1], [[1]]]), [1, 1, 1])
    })

    test("funciona con strings", () => {
        assert.deepEqual(flatten([["a"], [["b", "c"]], "d"]), [
            "a",
            "b",
            "c",
            "d",
        ])
    })

    test("funciona con objetos", () => {
        const ana = { name: "Ana" }
        const beto = { name: "Beto" }
        assert.deepEqual(flatten([[ana], [[beto]]]), [ana, beto])
    })

    test("no muta el array original", () => {
        const original: NArray<number> = [1, [2, [3]]]
        flatten(original)
        assert.deepEqual(original, [1, [2, [3]]])
    })

    test("aguanta anidamiento de 1000 niveles", () => {
        const profundo = (n: number): NArray<number> =>
            n === 0 ? [1] : [profundo(n - 1)]
        assert.deepEqual(flatten(profundo(1000)), [1])
    })

    test("equivale a Array::flat(Infinity)", () => {
        const casos: NArray<number>[] = [
            [0, [[[1]]], [2, [3], [4, [5]]], [], [[6]], [[], 7]],
            [1, [2, [3, [4]]]],
            [[], [[]], [1]],
            [],
        ]
        for (const c of casos)
            assert.deepEqual(flatten(c), (c as unknown[]).flat(Infinity))
    })
})

// ===========================================================
// Reto 3 (variante): flattenHasta (profundidad maxima inclusive)
// ===========================================================

describe("Reto 3 (variante): flattenHasta", () => {
    const ejemplo: NArray<number> = [
        0,
        [[[1]]],
        [2, [3], [4, [5]]],
        [],
        [[6]],
        [[], 7],
    ]

    test("profundidad 0 no alcanza a nadie", () => {
        assert.deepEqual(flattenHasta(ejemplo, 0), [])
    })

    test("profundidad 1 solo los elementos sueltos de afuera", () => {
        assert.deepEqual(flattenHasta(ejemplo, 1), [0])
    })

    test("profundidad 2", () => {
        assert.deepEqual(flattenHasta(ejemplo, 2), [0, 2, 7])
    })

    test("profundidad 3", () => {
        assert.deepEqual(flattenHasta(ejemplo, 3), [0, 2, 3, 4, 6, 7])
    })

    test("profundidad 4 ya alcanza a todos", () => {
        assert.deepEqual(flattenHasta(ejemplo, 4), [0, 1, 2, 3, 4, 5, 6, 7])
    })

    test("profundidad de sobra da lo mismo que flatten", () => {
        assert.deepEqual(flattenHasta(ejemplo, 99), flatten(ejemplo))
    })

    test("array vacio", () => {
        assert.deepEqual(flattenHasta([], 3), [])
    })

    test("array ya plano con profundidad 1", () => {
        assert.deepEqual(flattenHasta([1, 2, 3], 1), [1, 2, 3])
    })

    test("profundidad negativa se comporta como 0", () => {
        assert.deepEqual(flattenHasta(ejemplo, -5), [])
    })

    test("corta justo en el limite inclusive", () => {
        assert.deepEqual(flattenHasta([[[9]]], 2), [])
        assert.deepEqual(flattenHasta([[[9]]], 3), [9])
    })

    test("conserva el orden de izquierda a derecha", () => {
        assert.deepEqual(flattenHasta([[3], 1, [[2]], 4], 2), [3, 1, 4])
    })

    test("conserva valores falsy dentro del limite", () => {
        const falsy: NArray<number | boolean | string | null> = [
            0,
            [false, [""]],
            [null],
        ]
        assert.deepEqual(flattenHasta(falsy, 2), [0, false, null])
    })

    test("no muta el array original", () => {
        const original: NArray<number> = [1, [2, [3]]]
        flattenHasta(original, 2)
        assert.deepEqual(original, [1, [2, [3]]])
    })

    test("equivale a flatten cuando el limite supera la profundidad real", () => {
        const casos: NArray<number>[] = [
            [1, [2, [3, [4]]]],
            [[], [[]], [1]],
            [0, [[[1]]], [2, [3], [4, [5]]], [], [[6]], [[], 7]],
            [],
        ]
        for (const c of casos)
            assert.deepEqual(flattenHasta(c, 100), flatten(c))
    })
})
