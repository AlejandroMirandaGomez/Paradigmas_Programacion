import { $$ } from "./tools.ts"

$$("Hello from parsing")

// function ClousureExample() {
// const quasi_devil = 665
// const one = 1
// return () => quasi_devil + one
// }

// const quasi_devil = 998

// const devil = ClousureExample()

// $$("devil?", devil())

//////////////// Types ////////////////////

type TResult = "OK" | "FAIL"
type Ok<I, T> = {
    _type: TResult
    token: T
    rest: I
}

type Fail<R> = {
    _type: TResult
    reason: R
}

type Result<I, T, R> = Ok<I, T> | Fail<R>

const Ok = <I, T>(token: T, rest: I) => ({
    _type: "OK",
    token,
    rest,
})

const Fail = <R>(reason: R) => ({
    _type: "FAIL",
    reason,
})

const isFail = <I, T, R>(result: Result<I, T, R>) => result._type === "FAIL"

type InputString = {
    input: string
    index: number
}

const InputString = (input: string, index: number = 0) => ({
    input,
    index,
})

type TToken = "NUM" | "ID"
type Token = {
    _type: TToken
    value: string
}

const Token = (value: string, _type: TToken) => ({
    _type,
    value,
})
///////////PARSERS///////////

function Number() {
    const re_num = /^\s*(?<token>\d+)/y // /\s*/ es equivalente a new RegExp("\s*")
    const re_delim = /\W/y

    function parser(source: InputString) {
        const { input, index } = source
        re_num.lastIndex = index
        const match = re_num.exec(input)

        if (!match) return Fail("No number could be matched")

        const { token } = match?.groups
        re_delim.lastIndex = re_num.lastIndex
        if (re_delim.lastIndex < input.length && !re_delim.test(input))
            return Fail("Invalid delimiter after number")

        return Ok(Token(token, "NUM"), InputString(input, re_num.lastIndex))
    }
    //
    return parser
}

function Id() {
    const re_id = /^\s*(?<token>[a-zA-Z_]\w*)/y // /\s*/ es equivalente a new RegExp("\s*")

    function parser(source: InputString) {
        const { input, index } = source
        re_id.lastIndex = index
        const match = re_id.exec(input)

        if (!match) return Fail("No identifier could be matched")

        const { token } = match?.groups

        return Ok(Token(token, "ID"), InputString(input, re_id.lastIndex))
    }
    return parser
}

function Or(leftParser, rightParser) {
    function parser(source: InputString) {
        const result = leftParser(source)
        if (!isFail(result)) return result
        return rightParser(source)
    }
    return parser
}

//////////////// Testing //////////////////////

function test_0() {
    $$("-".repeat(80))
    const inputs = ["", "123 abc", "\n  123 abc  ", "123abc"]
    const numParser = Number()

    for (const input of inputs) {
        const result = numParser(InputString(input))
        $$(`Testing ${input}`, result)
    }
}

function test_1() {
    $$("-".repeat(80))
    const inputs = ["", "abc * (", "\n  123 abc  ", "  aBc_123 456", "123abc"]
    const idParser = Id()

    for (const input of inputs) {
        const result = idParser(InputString(input))
        $$(`Testing ${input}`, result)
    }
}

function test_2() {
    $$("-".repeat(80))
    const inputs = ["", "abc * (", "\n  123 abc  ", "  aBc_123 456", "123 abc"]
    const orParser = Or(Id(), Number())

    for (const input of inputs) {
        const result = orParser(InputString(input))
        $$(`Testing ${input}`, result)
    }
}

test_0()
test_1()
test_2()
