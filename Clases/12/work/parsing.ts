import { $$ } from "./tools.ts"

$$("Hello from parsing")

function ClousureExample() {
    const quasi_devil = 665
    const one = 1
    return () => quasi_devil + one
}

const quasi_devil = 998

const devil = ClousureExample()

$$("devil?", devil())

//////////////////////////////////////////

function Number() {
    //const re_num = /^( | \n | \t |\r)* $/
    const re_num = /^ \s* (?<token>\d+) (?<rest>.*)/
    const re_delim = /^\W/
    function parser(input: string) {
        const match = re_num.exec(input)

        if (!match) return null // very very uggly

        const { token, rest } = match?.groups

        if (!re_delim.test(rest)) return null

        return {
            token,
            rest,
        }
    }
    return parser
}

function test_0() {
	const inputs = [
		"",
		"123 abc ",
		"\n  123 abc",
		"123abc"
	]
	const numParser = Number()
	for (const input of input){
		let result = numParser(input)
		if (result) $$(`Testing ${input} => ` result)
	}
}
