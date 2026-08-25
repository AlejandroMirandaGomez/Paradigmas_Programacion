import { $$ } from "./tools.ts"

$$("Hello from parsing")

type Predicade<T> = (x: T) => boolean

const and =
    <T>(f: Predicade<T>, g: Predicade<T>) =>
    (x: Predicade<T>) =>
        f(x) && g(x)

const not =
    <T>(f: Predicade<T>) =>
    (x: Predicade<T>) =>
        !f(x)

$$(
    "Test and: ",
    and(
        (x) => x > 0,
        (x) => x === 5,
    )(5),
)

$$("Test not: ", not((x) => x > 0)(5))
