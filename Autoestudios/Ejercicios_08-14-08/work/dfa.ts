export const blank = " "

export const dfa_0 = {
    vocabulary: [blank, "1", "2"],
    states: ["A", "B", "C"],
    start: "A",
    final: ["C"],
    moves: [
        ["A", blank, "B"],
        ["A", 0, "C"],
        ["A", 1, "C"],
        ["B", blank, "B"],
        ["B", 0, "C"],
        ["B", 1, "C"],
        ["C", 0, "C"],
        ["C", 1, "C"],
    ],
}

export function dfaStatePairs(dfa, state) {
    return dfa.moves
        .filter(([origen]) => origen === state)
        .map(([, simbolo, destino]) => [simbolo, destino])
}

export function checkIfDeterministic(dfa) {
    return dfa.states
        .map((s) => dfaStatePairs(dfa, s).map(([simbolo]) => simbolo))
        .every((simbolos) => simbolos.length === new Set(simbolos).size)
}

export function normalizeDfa(dfa) {
    return {
        vocabulary: dfa.vocabulary.map(String),
        states: dfa.states.map(String),
        start: dfa.start.toString(),
        final: dfa.final.map(String),
        moves: dfa.moves.map((m) => m.map(String)),
    }
}

export function dfaTable(dfa) {
    const mapa = dfa.states.reduce((m, s) => m.set(s, new Map()), new Map())

    return dfa.moves.reduce(
        (mapa, m) => mapa.set(m[0], mapa.get(m[0]).set(m[1], m[2])),
        mapa,
    )
}

export function dfaTable2(dfa) {
    return new Map(dfa.states.map((s) => [s, new Map(dfaStatePairs(dfa, s))]))
}
