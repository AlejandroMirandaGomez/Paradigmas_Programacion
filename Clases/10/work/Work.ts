import { $$ } from "./tools.ts"

// import "./test.ts"

// import "./dfa.ts"

const delta = (acc, curr) => acc + curr

const sum = (a: number[]) => a.reduce(delta, 0)

let a = [10, -5, 3, -9, 20]

$$(sum(a))

const map = (a, f) => a.reduce((acc, curr) => [...acc, f(curr)], [])

const f = (x) => x ** 2

$$(map([2, 4], f))
