import { test, describe } from "node:test"
import assert from "node:assert/strict"
import {
    id,
    composition,
    nand,
    not,
    and,
    or,
    nor,
    xor,
    re_horas,
} from "./Work.ts"

// ===========================================================
// Ejercicio 1: composition
// ===========================================================
describe("Ejercicio 1: composition", () => {
    test("sin funciones retorna la identidad", () => {
        assert.equal(composition<number>()(5), 5)
        assert.equal(composition<number>()(0), 0)
    })

    test("una sola funcion equivale a aplicarla directo", () => {
        const suma1 = (x: number) => x + 1
        assert.equal(composition(suma1)(5), suma1(5))
    })

    test("aplica en orden f_n(...f_1(x)), no al reves", () => {
        const doble = (x: number) => x * 2
        const mas100 = (x: number) => x + 100
        assert.equal(composition(doble, mas100)(5), 110)
        assert.equal(composition(mas100, doble)(5), 210)
    })

    test("caso del enunciado: queHace(x) = (x^2 - 2x) + 1", () => {
        const queHace = composition(
            (x: number) => x ** 2,
            (x: number) => x - 2 * x,
            (x: number) => x + 1,
        )
        assert.equal(queHace(3), -8)
        assert.equal(queHace(0), 1)
        assert.equal(queHace(-2), -3)
    })

    test("no muta el arreglo de funciones recibido", () => {
        const funs = [(x: number) => x + 1, (x: number) => x * 2]
        const copia = [...funs]
        composition(...funs)(5)
        assert.deepEqual(funs, copia)
    })

    test("id es la identidad para cualquier valor", () => {
        assert.equal(id(42), 42)
        assert.equal(id("hola"), "hola")
    })
})

// ===========================================================
// Ejercicio 2: nand (y and, or, not, nor, xor a partir de nand)
// ===========================================================
describe("Ejercicio 2: nand y demas operadores logicos", () => {
    const esPar = (x: number) => x % 2 === 0
    const esNegativo = (x: number) => x < 0
    const valores = [-4, -3, 0, 3, 4]

    test("nand: tabla de verdad con constantes true/false", () => {
        const t = () => true
        const f = () => false
        assert.equal(nand(t, t)(null), false)
        assert.equal(nand(t, f)(null), true)
        assert.equal(nand(f, t)(null), true)
        assert.equal(nand(f, f)(null), true)
    })

    for (const x of valores) {
        const a = esPar(x)
        const b = esNegativo(x)

        test(`not(esPar) en x=${x} es !esPar(x)`, () => {
            assert.equal(not(esPar)(x), !a)
        })

        test(`and(esPar, esNegativo) en x=${x} es esPar(x) && esNegativo(x)`, () => {
            assert.equal(and(esPar, esNegativo)(x), a && b)
        })

        test(`or(esPar, esNegativo) en x=${x} es esPar(x) || esNegativo(x)`, () => {
            assert.equal(or(esPar, esNegativo)(x), a || b)
        })

        test(`nor(esPar, esNegativo) en x=${x} es !(esPar(x) || esNegativo(x))`, () => {
            assert.equal(nor(esPar, esNegativo)(x), !(a || b))
        })

        test(`xor(esPar, esNegativo) en x=${x} es esPar(x) !== esNegativo(x)`, () => {
            assert.equal(xor(esPar, esNegativo)(x), a !== b)
        })
    }
})

// ===========================================================
// Ejercicio 3: re_horas (horas validas de 0 a 23, con o sin cero a la izquierda)
// ===========================================================
describe("Ejercicio 3: re_horas", () => {
    test("acepta todas las horas de 0 a 23 sin cero a la izquierda", () => {
        for (let h = 0; h <= 23; h++) {
            assert.notEqual(
                re_horas.exec(String(h)),
                null,
                `deberia aceptar ${h}`,
            )
        }
    })

    test("acepta todas las horas de 0 a 23 con cero a la izquierda", () => {
        for (let h = 0; h <= 23; h++) {
            const s = h < 10 ? "0" + h : String(h)
            assert.notEqual(re_horas.exec(s), null, `deberia aceptar ${s}`)
        }
    })

    test("rechaza horas fuera de rango (24 en adelante)", () => {
        for (let h = 24; h <= 99; h++) {
            assert.equal(
                re_horas.exec(String(h)),
                null,
                `no deberia aceptar ${h}`,
            )
        }
    })

    test("rechaza negativos", () => {
        assert.equal(re_horas.exec("-1"), null)
        assert.equal(re_horas.exec("-10"), null)
    })

    test("rechaza formatos invalidos", () => {
        assert.equal(re_horas.exec(""), null)
        assert.equal(re_horas.exec("007"), null)
        assert.equal(re_horas.exec("1.5"), null)
        assert.equal(re_horas.exec(" 5"), null)
        assert.equal(re_horas.exec("5 "), null)
        assert.equal(re_horas.exec("5a"), null)
        assert.equal(re_horas.exec("a5"), null)
        assert.equal(re_horas.exec("2,3"), null)
    })
})
