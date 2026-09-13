import { $$ } from "./tools.ts"

//////////////// Types ////////////////////

type Input<T> = {
    input: T
    index: number
}

export type InputString = Input<string>

export const InputString = (input: string, index = 0) => ({
    input,
    index,
})

enum TypeRes {
    Fail,
    Ok,
}

type Res<T, I, R> = Ok<T, I> | Fail<R>

type Fail<R> = {
    _type: TypeRes
    reason: R
}

type Ok<T, I> = {
    _type: TypeRes
    token: T
    input: I
}

const Ok = <T, I>(token: T, input: I): Ok<T, I> => ({
    _type: TypeRes.Ok,
    token,
    input,
})

const Fail = <R>(reason: R): Fail<R> => ({
    _type: TypeRes.Fail,
    reason,
})

type TypeToken = "Num" | "String"

type Token = {
    _type: TypeToken
    value: string
}

const Token = (_type: TypeToken, value: string) => ({
    _type,
    value,
})

export const isFail = <T, I, R>(res: Res<T, I, R>): res is Fail<R> =>
    res._type === TypeRes.Fail

///////////PARSERS///////////

export function parser_num() {
    const re_token = /(?<token>\d+)/y
    const re_delim = /-|\s/y
    function lexer(source: InputString) {
        const { input, index } = source

        re_token.lastIndex = index

        const match = re_token.exec(input)
        if (!match) return Fail("Fallo el match")

        re_delim.lastIndex = re_token.lastIndex
        if (re_delim.lastIndex < input.length && !re_delim.test(input))
            return Fail("Fallo en el delimitador")

        const { token } = match.groups!
        return Ok(
            Token("Num", token!),
            InputString(input, re_delim.lastIndex),
        )
    }
    return lexer
}

/////////// QUIZ 03 ///////////

export type Pred<T> = (x: T) => boolean
export type IS = InputString
export type RES = Res<Token, IS, string>
export type Lexer = (input: IS) => RES

// pd: Se asume que n siempre es mayor a 0

export const REPEAT_ITERATIVO = (n: number, p: Lexer): Lexer => {
    const q = (s: IS) => {
        let result!: RES
        for (let i = 1; i <= n; i = i + 1) {
            result = p(s)
            if (isFail(result))
                return Fail(`Repeat fails at iter ${i} of ${n}.`)
            s = InputString(s.input, result.input.index)
        }
        return result
    }
    return q
}

export const REPEAT = (n: number, p: Lexer): Lexer => {
    const q = (s: IS, i = 1) => {
        const result = p(s)
        if (isFail(result)) return Fail(`Repeat fails at iter ${i} of ${n}.`)
        if (i === n) return result

        const next = InputString(s.input, result.input.index)
        return q(next, i + 1)
    }

    return q
}
