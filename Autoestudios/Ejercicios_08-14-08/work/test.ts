import { $$ } from "./tools.ts"

import { blank, dfa_0, dfaStatePairs, checkIfDeterministic } from "./dfa.ts"

const base = { vocabulary: [blank, "0", "1"], start: "A", final: ["C"] }

const dfa_vacio = { ...base, states: ["A"], moves: [] }

const dfa_unEstado = {
    ...base,
    states: ["A"],
    moves: [
        ["A", 0, "A"],
        ["A", 1, "A"],
        ["A", blank, "A"],
    ],
}

const dfa_mismoSimboloOtroEstado = {
    ...base,
    states: ["A", "B", "C"],
    moves: [
        ["A", 0, "B"],
        ["B", 0, "C"],
        ["C", 0, "A"],
    ],
}

const dfa_ndPrimero = {
    ...base,
    states: ["A", "B", "C"],
    moves: [
        ["A", 0, "B"],
        ["A", 0, "C"],
        ["B", 1, "C"],
    ],
}

const dfa_ndUltimo = {
    ...base,
    states: ["A", "B", "C"],
    moves: [
        ["A", 0, "B"],
        ["B", 1, "C"],
        ["C", 1, "A"],
        ["C", 1, "B"],
    ],
}

const dfa_ndBlank = {
    ...base,
    states: ["A", "B", "C"],
    moves: [
        ["A", blank, "B"],
        ["A", blank, "C"],
        ["B", 0, "C"],
    ],
}

const dfa_duplicado = {
    ...base,
    states: ["A", "B"],
    moves: [
        ["A", 0, "B"],
        ["A", 0, "B"],
        ["B", 1, "B"],
    ],
}

const dfa_tipos = {
    ...base,
    states: ["A", "B", "C"],
    moves: [
        ["A", 0, "B"],
        ["A", "0", "C"],
    ],
}

const dfa_estadoHuerfano = {
    ...base,
    states: ["A"],
    moves: [
        ["A", 0, "A"],
        ["Z", 1, "A"],
        ["Z", 1, "B"],
    ],
}

const igual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const marca = (ok) => (ok ? "  OK  " : " FALLA")

const titulo = (texto) => {
    $$("~~".repeat(20))
    $$(texto)
}

const correr = (casos, ejecutar) =>
    casos.forEach(([nombre, entrada, esperado]) => {
        const obtenido = ejecutar(entrada)
        $$(marca(igual(obtenido, esperado)), nombre.padEnd(26), obtenido)
    })

titulo("2a) dfaStatePairs(dfa_0, state)")

correr(
    [
        [
            "estado A",
            "A",
            [
                [blank, "B"],
                [0, "C"],
                [1, "C"],
            ],
        ],
        [
            "estado B",
            "B",
            [
                [blank, "B"],
                [0, "C"],
                [1, "C"],
            ],
        ],
        [
            "estado C",
            "C",
            [
                [0, "C"],
                [1, "C"],
            ],
        ],
        ["estado inexistente", "Z", []],
    ],
    (state) => dfaStatePairs(dfa_0, state),
)

titulo("2b) checkIfDeterministic(dfa) deterministas")

correr(
    [
        ["dfa_0", dfa_0, true],
        ["dfa_vacio", dfa_vacio, true],
        ["dfa_unEstado", dfa_unEstado, true],
        ["dfa_mismoSimboloOtroEstado", dfa_mismoSimboloOtroEstado, true],
    ],
    checkIfDeterministic,
)

titulo("2b) checkIfDeterministic(dfa) no deterministas")

correr(
    [
        ["dfa_ndPrimero", dfa_ndPrimero, false],
        ["dfa_ndUltimo", dfa_ndUltimo, false],
        ["dfa_ndBlank", dfa_ndBlank, false],
    ],
    checkIfDeterministic,
)

titulo("2b) checkIfDeterministic(dfa) casos borde")

correr(
    [
        ["dfa_duplicado", dfa_duplicado, false],
        ["dfa_tipos", dfa_tipos, true],
        ["dfa_estadoHuerfano", dfa_estadoHuerfano, true],
    ],
    checkIfDeterministic,
)

$$("~~".repeat(20))
