import fs from "fs";

const juan = {
  name: "Juan",
  age: 20,
  gender: "male",
};

class Person {
  #name;
  #age;
  #gender;
  constructor(name: string, age: number, gender: string) {
    this.#name = name;
    this.#age = age;
    this.#gender = gender;
  }
  get name() {
    return this.#name;
  }
  get age() {
    return this.#age;
  }
  get gender() {
    return this.#gender;
  }
  toString() {
    return `Person[${this.#name}, ${this.#name}, ${this.#name}]`;
  }
  toJSON() {
    return {
      name: this.#name,
      age: this.#age,
      gender: this.#gender,
    };
  }
  saveToJSON(filename: string) {
    const json: string = JSON.stringify(this);
    fs.writeFileSync(filename, json);
  }
  equals_happy(other: Person) {
    return (
      this.#name === other.#name &&
      this.#age === other.#age &&
      this.#gender === other.#gender
    );
  }
  // Método supuestamente 'mejor practica'
  equals(other: unknown): boolean {
    if (this === other) return true;

    if (!(other instanceof Person)) return false;

    if (Object.getPrototypeOf(this) !== Object.getPrototypeOf(other))
      return false;

    return (
      this.#name === other.#name &&
      this.#age === other.#age &&
      this.#gender === other.#gender
    );
  }
}

function namesakes_bad(persons) {
  const result = [];
  const names_visited = [];
  for (let i = 0; i < persons.length; i++) {
    const namesakes = [];
    if (names_visited.includes(persons[i].name)) continue;
    for (let j = i + 1; j < persons.length; j++) {
      if (persons[i].name === persons[j].name) {
        if (!namesakes.includes(persons[i])) {
          names_visited.push(persons[i].name);
          namesakes.push(persons[i]);
        }
        if (!namesakes.includes(persons[j])) {
          namesakes.push(persons[j]);
        }
      }
    }
    if (!namesakes.length) {
      namesakes.push(persons[i]);
    }
    result.push(namesakes);
  }
  return result;
}

function namesakes_v1(persons) {
  const m = new Map();
  for (let i = 0; i < persons.length; i++) {
    namesakes ? namesakes.push(persons[i]) : (namesakes = [persons[i]]);
    m.set(persons[i].name, namesakes);
  }
  return [...m.values()];
}

function namesakes_v2(persons) {
  const insert = (m, p) => m.set(p.name, [...(m.get(p.name) ?? []), p]);
  return [...persons.reduce(insert, new Map()).values()];
}

const namesakes_v3 = (persons) => [
  ...persons
    .reduce((m, p) => m.set(p.name, [...(m.get(p.name) ?? []), p]), new Map())
    .values(),
];

// Pruebas:

console.log(juan);

const juan_es6 = new Person("Juan", 20, "male");

console.log(juan_es6.toString());

juan_es6.saveToJSON("archivoPrueba1.txt");

const clonJuan = new Person("Juan", 20, "male");

console.log(juan_es6.equals(clonJuan));

console.log(juan_es6 === juan_es6);

const p1 = new Person("Lisa", 20, "female");
const p2 = new Person("Pedro", 40, "male");
const p3 = new Person("Sebastian", 23, "male");
const p4 = new Person("Pedro", 23, "male");

const array_persons = [p1, p2, p3, p4];

console.log(namesakes_v2(array_persons));
