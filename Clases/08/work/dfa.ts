import { $$ } from "./tools.ts"

$$("~~".repeat(10))

const black = " "

const dfa_0 = {
    vocabulary: [black, "1", "2"],
    states: ["A", "B", "C"],
    start: "A",
    final: ["C"],
    moves: [
        ["A", black, "B"],
        ["A", 0, "C"],
        ["A", 1, "C"],
        ["B", black, "B"],
        ["B", 0, "C"],
        ["B", 1, "C"],
        ["C", 0, "C"],
        ["C", 1, "C"],
    ],
}

function dfaStatePairs(dfa, state){
	const m = new Map();
	dfa.moves.reduce(, m)
}

$$("~~".repeat(10))
