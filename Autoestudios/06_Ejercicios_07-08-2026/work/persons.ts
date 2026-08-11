import { inspect } from "util"

type Gender = "Male" | "Female"

type Format = "FML" | "L,FM" // Formatos para Name

type Name = {
    readonly first: string
    readonly middle: string
    readonly last: string
    full(fmt: Format): string
}

function fullName(this: Name, fmt: Format): string {
    return fmt === "FML"
        ? `${this.first} ${this.middle} ${this.last}`
        : `${this.last}, ${this.first} ${this.middle}`
}

function createName(first: string, middle: string, last: string): Name {
    return {
        first,
        middle,
        last,
        full: fullName,
    }
}

class TSPerson {
    constructor(
        private _name: Name,
        private _age: number,
        private _gender: Gender,
    ) {}
    get name() {
        return this._name.full("FML")
    }
    get age() {
        return this._age
    }
    get gender() {
        return this._gender
    }
    toString() {
        return `TSPerson[${this.name}, ${this.age}, ${this.gender}]`
    }
    [inspect.custom]() {
        return this.toString()
    }
}

export { createName, TSPerson }
export type { Format, Gender, Name }
