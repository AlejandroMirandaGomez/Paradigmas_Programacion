import { $$ } from "./tools.ts"
import { TSPerson, createName } from "./persons.ts"

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
        return `Person[${this.#name}, ${this.#age}, ${this.#gender}]`
    }
}

const KeylorName = createName("Keylor", "Jesus", "Segura")

const keylor_ts = new TSPerson(KeylorName, 20, "Male")

$$(keylor_ts)

$$("Hola Mundo")
