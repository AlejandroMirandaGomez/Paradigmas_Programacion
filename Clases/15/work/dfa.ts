import { $$ } from "./tools.ts"

// import { inspect } from "node:util"

// $$("~~".repeat(10))

// const black = " "

// const dfa_0 = {
    // vocabulary: [black, "1", "2"],
    // states: ["A", "B", "C"],
    // start: "A",
    // final: ["C"],
    // moves: [
        // ["A", black, "B"],
        // ["A", 0, "C"],
        // ["A", 1, "C"],
        // ["B", black, "B"],
        // ["B", 0, "C"],
        // ["B", 1, "C"],
        // ["C", 0, "C"],
        // ["C", 1, "C"],
    // ],
// }

// function dfaStatePairsOperativo(dfa, state) {
    // const pairs = []
    // for (const triple of dfa.moves) {
        // if (state === triple[0]) pairs.push(triple[1], triple[2])
    // }

    // return pairs
// }

// function dfaStatePairs(dfa, state) {
    // return dfa.moves
        // .filter(([f, w, t]) => f === state)
        // .map(([f, w, t]) => [w, t])
// }

// $$("dfaStatePairs(dfa_0, A)", dfaStatePairs(dfa_0, "A"))

// function dfaAllStatePairs(dfa) {
    // return dfa.states.map((state) => [state, dfaStatePairs(dfa, state)])
// }

// $$(
    // "dfaStatePairs(dfa_0, A)",
    // inspect(dfaAllStatePairs(dfa_0, "A"), { depth: 3, colors: true }),
// )

// $$("~~".repeat(10))
