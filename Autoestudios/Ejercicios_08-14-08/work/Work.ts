import { $$ } from "./tools.ts"

import "./dfa.ts"
//import "./test.ts"
//import "./ejercicioB.js"

function arraysToMap<T, K>(a: T[], b: K[]) {
    /** SPEC
    * Recibe dos arrays a y b 
    del mismo largo n con 
    a=[a_1, ...,a_n] y 
    b=[b_1,...,b_n]
    * Retorna un Map tal que 
    a_i es llave del valor b_i 
    para cada i \in {1,..., n}    
  */
    const m = new Map<T, K>()
    a.forEach((clave, i) => m.set(clave, b[i]!))
    return m
}

function cartesian(...arrays) {
    /** SPEC
    * Recibe n arrays A_1,...,A_n
    * Retorna el producto cartesiano
    A_1 x ... x A_n: el array de TODAS
    las tuplas [x_1,...,x_n] con
    x_i en A_i
    * Orden: como un odometro, el
    ULTIMO array es el que varia mas
    rapido
    * Casos borde obligatorios:
    cartesian() -> [[]]
    cartesian([1,2], []) -> []
    * RESTRICCIONES: un solo reduce,
    sin recursion, sin bucles anidados,
    sin mutar nada
    * Ejemplos:
    cartesian([1,2], ["a","b"])
    -> [[1,'a'],[1,'b'],
        [2,'a'],[2,'b']]

    cartesian([1,2], ["a","b"], [true,false])
    -> [[1,'a',true],  [1,'a',false],
        [1,'b',true],  [1,'b',false],
        [2,'a',true],  [2,'a',false],
        [2,'b',true],  [2,'b',false]]
  */

    const agregarArray = (tuplas, arrayNuevo) =>
        tuplas.map((t) => arrayNuevo.map((e) => [...t, e])).flat()

    return arrays.reduce(agregarArray, [[]])
}

function words(vocabulary, n) {
    /** SPEC
    * Retorna todas las palabras de largo
    exactamente n sobre vocabulary, como
    strings
    * Definalo SOBRE cartesian, sin
    escribir otro reduce
    * words([..."ab"], 2)
    -> ['aa','ab','ba','bb']
    * Cuanto da words(v, 0)?
  */

    return cartesian(...Array.from({ length: n }, () => vocabulary)).map((t) =>
        t.join(""),
    )
}

console.log(words([..."ab"], 2))

// console.log(cartesian([1, 2], ["a", "b"], [true, false]))
