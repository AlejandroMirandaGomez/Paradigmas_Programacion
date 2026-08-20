import { $$ } from "./tools.ts"

// import "./test.ts"

import "./dfa.ts"

function arraysToMap<T, B>(a: T[], b: B[]) {
    /** SPEC
    * Recibe dos arrays a y b 
    del mismo largo n con 
    a=[a_1, ...,a_n] y 
    b=[b_1,...,b_n]
    * Retorna un Map tal que 
    a_i es llave del valor b_i 
    para cada i \in {1,..., n}    
  */
    return new Map(a.map((llave, i) => [llave, b[i]]))
}

$$("")
$$("TEST arraysToMap(a, b)")
$$("")

const vowels = [..."aeiou"]
const range = [..."12345"].map(Number)
const vowelsRanges = arraysToMap(vowels, range)
console.log(" (1) arraysToMap(vowels, range): \n", vowelsRanges)
