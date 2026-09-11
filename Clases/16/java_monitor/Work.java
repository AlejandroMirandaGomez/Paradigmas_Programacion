// type TResult = "OK" | "FAIL"
// type Ok<I, T> = {
    // _type: TResult
    // token: T
    // rest: I
// }

// type Fail<R> = {
    // _type: TResult
    // reason: R
// }

// type Result<I, T, R> = Ok<I, T> | Fail<R>

// const Ok = <I, T>(token: T, rest: I) => ({
    // _type: "OK",
    // token,
    // rest,
// })

// const Fail = <R>(reason: R) => ({
    // _type: "FAIL",
    // reason,
// })

// const isFail = <I, T, R>(result: Result<I, T, R>) => result._type === "FAIL"

// type InputString = {
    // input: string
    // index: number
// }

// const InputString = (input: string, index: number = 0) => ({
    // input,
    // index,
// })

// type TToken = "NUM" | "ID"
// type Token = {
    // _type: TToken
    // value: string
// }

// const Token = (value: string, _type: TToken) => ({
    // _type,
    // value,
// })

// Record -> Lo más parecido a un struct, se usa como DTO, son imnutables.

sealed interface Result<I, T, R> permits Ok, Fail{}

record Ok<I, T, R>(T token, I rest) implements Result<I, T, R>{}

record Fail<I, T, R>(R reason) implements Result<I, T, R>{}

interface input<T>{
	T input();
	int index();
}

record inputString(String input, int index) implements input<String>{}

enum TToken {
	Num, Id
}

interface IToken<T>{
	TToken type();
	T value();
}

void main(){
    IO.println("\n*** Work.java Stars****\n"); 
	
	IO.println("Work.java is working ok");
	
    IO.println("\n*** Work.java Ends****\n");   
}