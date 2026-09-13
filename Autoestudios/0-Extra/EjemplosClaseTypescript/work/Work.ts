// Esto no se entiende:
function fooMal<T>( x: (a: T) => boolean, y: (a: T) => boolean): (a: T[]) => T[] {
    return (a: T[]): T[] => a.filter(x).filter(y)
}

// Es mejor asi:

type pred<T> = (a: T) => boolean

function foo1<T>(x: pred<T>, y: pred<T>) {
    return (a: T[]) => a.filter(x).filter(y)
}

// o asi:

const foo2 = <T>(x: pred<T>, y: pred<T>) => (a: T[]) => a.filter(x).filter(y)

////////////////////////////////////////////////////////////////////////////////

let nombre = "Alejandro"

const saludo = () => "Hola mundo"

console.log(saludo())
