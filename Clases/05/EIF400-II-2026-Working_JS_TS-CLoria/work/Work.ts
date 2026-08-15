let x:any = "hola"

x = 666

const juan = {
	name:"Juan", 
	age: 20,
	gender: "male"
}

class Person{
	#name;
	#age;
	#gender;
	constructor(name, age, gender){
		this.#name = name
		this.#age = age
		this.#gender = gender
	}
	toString(){
		return `Person[${this.#name}, ${this.#name}, ${this.#name}]`
	}
}

console.log(juan)

const juan_es6 = new Person("Juan", 20, "male")

console.log(juan_es6.toString())