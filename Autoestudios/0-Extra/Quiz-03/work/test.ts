import { $$ } from "./tools.ts"
import { InputString, parser_num, REPEAT_ITERATIVO, REPEAT } from "./quiz03.ts"

function test_repeat_iterativo() {
    $$("-".repeat(80))
    $$("REPEAT_ITERATIVO")

    const cases: [string, number][] = [
        ["123 456 789", 3],
        ["123 abc 789", 3],
        ["123 456", 3],
    ]

    for (const [input, n] of cases) {
        const p = parser_num()
        const result = REPEAT_ITERATIVO(n, p)(InputString(input))
        $$(`n=${n} input="${input}" ->`, result)
    }
}

function test_repeat() {
    $$("-".repeat(80))
    $$("REPEAT")

    const cases: [string, number][] = [
        ["123 456 789", 3],
        ["123 abc 789", 3],
        ["123 456", 3],
    ]

    for (const [input, n] of cases) {
        const p = parser_num()
        const result = REPEAT(n, p)(InputString(input))
        $$(`n=${n} input="${input}" ->`, result)
    }
}

test_repeat_iterativo()
test_repeat()
