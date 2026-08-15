import { $$ } from "./tools.ts"

const juan = {
    name: "Juan",
    age: 20,
    gender: "male",
}

class Person {
    // ES6
    #name
    #age
    #gender
    constructor(name: string, age: number, gender: string) {
        this.#name = name
        this.#age = age
        this.#gender = gender
    }
    get name() {
        return this.#name
    }
    get age() {
        return this.#age
    }
    get gender() {
        return this.#gender
    }
    toString() {
        return `Person[${this.#name}, ${this.#name}, ${this.#name}]`
    }
}

type Name = string

type Gender = "Male" | "Female"

class TSPerson {
    // TS
    constructor(
        private _name: Name,
        private _age: number,
        private _gender: Gender,
    ) {}
    get name() {
        return this._name
    }
    get age() {
        return this._age
    }
    get gender() {
        return this._gender
    }
}

const juan_ts = new TSPerson("Juan", 20, "Male")

$$(juan_ts, juan_ts.name)

$$("Hola Mundo")
