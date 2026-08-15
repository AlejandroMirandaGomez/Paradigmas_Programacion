import { $$ } from "./tools.ts"

type Fun<T> = (x: T) => T

//Infiere el tipo de retorno (number)
function apply<T>(f: Fun<T>, x: T) {
    return f(x)
}

$$(((x) => x ** 2 + 1)(10))

$$(apply((x) => "x**2+1", "10"))

$$(apply((x) => x ** 2 + 1, 10))

function f(x: number) {
    return x ** 2 + 1
}

$$(apply(f, 10))
