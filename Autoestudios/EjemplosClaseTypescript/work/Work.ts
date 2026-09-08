type pred<T> = (a: T) => boolean

function foo<T>(x: pred<T>, y: pred<T>) {
    return (a: T[]) => a.filter(x).filter(y)
}

let nombre = "Alejandro"

const saludo = () => "Hola mundo"

console.log(saludo())
