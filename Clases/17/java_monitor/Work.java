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

record InputString(String input, int index) implements input<String>{}

enum TToken {
	Num, Id
}

interface IToken<T>{
	TToken type();
	T value();
}

record TokenString(TToken type, String value) implements IToken<String> {}

interface Parser<I, T, R>{
	Result<I, T, R> parse(I source);
}

interface Lexer extends Parser<InputString, TokenString, String> {}

class Lexers{
	static Lexer Number() {
		var re_num = Pattern.compile("\\s*(?<token>\\d+)");
		var re_delim = Pattern.compile("\\W+");
		
		Lexer lexer = (InputString source) -> {
			var input = source.input();
			var index = source.index();
			// Obtener el matcher del token
			var tokenMatcher = re_num.matcher(input);
			tokenMatcher.region(index, input.length());
			
			// Verificar que matchee
			if(!tokenMatcher.lookingAt()) 
				return new Fail<>("No number could be match");
			
			// Verificar que el delimitador sea correcto
			var delimMatcher = re_delim.matcher(input);
			var hasCharsLeft = tokenMatcher.end() < input.length();
			delimMatcher.region(tokenMatcher.end(), input.length());
			if(hasCharsLeft && !delimMatcher.lookingAt())
				return new Fail<>("No identifier could be matched");
			
			// Respuesta en caso de todo correcto
			var token = new TokenString(TToken.Num, tokenMatcher.group("token"));
			var newIndex = hasCharsLeft ? delimMatcher.end() : tokenMatcher.end();
			var newSource = new InputString(input, newIndex);
			return new Ok<>(token, newSource);
			
		};
		return lexer;
	}
	
	static Lexer Id() {
		var re_id = Pattern.compile("\\s*(?<token>[a-zA-Z_]\\w*)");
		
		Lexer lexer = (InputString source) -> {
			var input = source.input();
			var index = source.index();
			// Obtener el matcher del token
			var tokenMatcher = re_id.matcher(input);
			tokenMatcher.region(index, input.length());
			
			// Verificar que matchee
			if(!tokenMatcher.lookingAt()) 
				return new Fail<>("No Id could be match");
			
			// Respuesta en caso de todo correcto
			var token = new TokenString(TToken.Id, tokenMatcher.group("token"));
			var newSource = new InputString(input, tokenMatcher.end());
			return new Ok<>(token, newSource);
			
		};
		return lexer;
	}
	
	static <I, T, R> Parser <I, T, R> Or(Parser<I, T, R> p, Parser<I, T, R> q){
		Parser<I, T, R> parser = (I source) -> {
			var result = p.parse(source);				
			if (result instanceof Ok<I, T, R> ok)
				return ok;
			return q.parse(source);
		};
		return parser;
	}
}

void test_0(String title){
	IO.println(title);
	
	var inputs = List.of("123", "  123 abc", "", "123abc", "abc");
	for (var input : inputs) {
		var numLexer = new Lexers().Number();
		var source = new InputString(input, 0);
		
		Result<InputString, TokenString, String> result = numLexer.parse(source);
		switch (result) {
			case Ok<InputString, TokenString, String> ok -> 
				IO.println(String.format(" ( Ok ) >>> Input = '%s' \n    Token = '%s'", input, ok.token));
			case Fail<InputString, TokenString, String> fail -> 
				IO.println(String.format(" (Fail) >>> Input = '%s' \n    Reason = '%s'", input, fail.reason));
		}
	}
}

void test_1(String title){
	IO.println(title);
	
	var inputs = List.of("123", "  123 abc", "", "123abc", "abc", "abc123 abcd");
	for (var input : inputs) {
		var idLexer = new Lexers().Id();
		var source = new InputString(input, 0);
		
		Result<InputString, TokenString, String> result = idLexer.parse(source);
		switch (result) {
			case Ok<InputString, TokenString, String> ok -> 
				IO.println(String.format(" ( Ok ) >>> Input = '%s' \n    Token = '%s'", input, ok.token));
			case Fail<InputString, TokenString, String> fail -> 
				IO.println(String.format(" (Fail) >>> Input = '%s' \n    Reason = '%s'", input, fail.reason));
		}
	}
}

void test_2(String title){
	IO.println(title);
	
	var inputs = List.of("123", "  123 abc", "", "123abc", "abc", "abc123 abcd");
	for (var input : inputs) {
		var numLexer = new Lexers().Number();
		var idLexer = new Lexers().Id();
		var orLexer = new Lexers().Or(numLexer, idLexer);
		var source = new InputString(input, 0);
		
		Result<InputString, TokenString, String> result = orLexer.parse(source);
		switch (result) {
			case Ok<InputString, TokenString, String> ok -> 
				IO.println(String.format(" ( Ok ) >>> Input = '%s' \n    Token = '%s'", input, ok.token));
			case Fail<InputString, TokenString, String> fail -> 
				IO.println(String.format(" (Fail) >>> Input = '%s' \n    Reason = '%s'", input, fail.reason));
		}
	}
}

void main(){
    IO.println("\n*** Work.java Stars****\n"); 
	
	IO.println("Work.java is working okded");
	
	test_0("~~~~~~~~~TEST 0~~~~~~~~~");
	IO.println();
	test_1("~~~~~~~~~TEST 1~~~~~~~~~");
	IO.println();
	test_2("~~~~~~~~~TEST 2~~~~~~~~~");
		
    IO.println("\n*** Work.java Ends****\n");   
}