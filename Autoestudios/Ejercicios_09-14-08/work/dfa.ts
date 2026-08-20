import { $$ } from "./tools.ts"

$$("~~".repeat(10))

type move = [string, string, string]

type dfa = {
    vocabulary: string[]
    states: string[]
    start: string
    final: string[]
    moves: move[]
}

const dfa_0: dfa = {
    vocabulary: [" ", "0", "1"],
    states: ["A", "B", "C"],
    start: "A",
    final: ["C"],
    moves: [
        ["A", " ", "B"],
        ["A", "0", "C"],
        ["A", "1", "C"],
        ["B", " ", "B"],
        ["B", "0", "C"],
        ["B", "1", "C"],
        ["C", "0", "C"],
        ["C", "1", "C"],
    ],
}

const dfaStatePairs = (dfa: dfa, state: string) =>
    dfa.moves
        .filter(([s]) => s === state)
        .map(([, w, t]): [string, string] => [w, t])

$$(" (2a) dfaStatePairs(dfa_0, A): \n", dfaStatePairs(dfa_0, "A"))

const dfaSymbols = (dfa: dfa, state: string) =>
    dfa.moves.filter(([s]) => s === state).map(([, w]) => w)

const checkIfDeterministic = (dfa: dfa) =>
    dfa.states.every(
        (s) => dfaSymbols(dfa, s).length === new Set(dfaSymbols(dfa, s)).size,
    )

$$(" (2b) checkIfDeterministic(dfa_0): ", checkIfDeterministic(dfa_0))

$$("~~".repeat(10))
