// Record -> Lo más parecido a un struct, se usa como DTO, son imnutables.

// 
sealed interface Result<I, T, R> permits Ok, Fail{}

record Ok<I, T, R>(T token, I rest) implements Result<I, T, R>{}

record Fail<I, T, R>(R reason) implements Result<I, T, R>{}

interface input<T>{
	T input();
	int index();
}

record InputString(String input, int index) implements input<String>{}

enum TToken {
	Num, Id, Literal
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
		
		Lexer lexer = (InputString source) -> {
			var input = source.input();
			var index = source.index();
			// Obtener el matcher del token
			var matcher = re_num.matcher(input);
			matcher.region(index, input.length());
			
			// Verificar que matchee
			if(!matcher.lookingAt()) 
				return new Fail<>("No number could be match");
			
			// Respuesta en caso de todo correcto
			var token = new TokenString(TToken.Num, matcher.group("token"));
			var newIndex = matcher.end();
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
	
	static Lexer Literal(String literalInput){
		var re_literal = Pattern.compile("\\s*(?<token>" + Pattern.quote(literalInput) + ")");
		
		Lexer lexer = (InputString source) -> {
			var input = source.input();
			var index = source.index();
			
			var matcher = re_literal.matcher(input);
			matcher.region(index, input.length());
			
			if(!matcher.lookingAt())
				return new Fail<>("No literal could be match");

			var newSource = new InputString(input, matcher.end());
			var token = new TokenString(TToken.Literal, matcher.group("token"));
			
			return new Ok<>(token, newSource);
		};
		return lexer;
	}
}

class Parsers {
	static <I, T, R> Parser <I, T, R> Or(Parser<I, T, R> p, Parser<I, T, R> q){
		Parser<I, T, R> parser = (I source) -> {
			var result = p.parse(source);				
			if (result instanceof Ok<I, T, R> ok)
				return ok;
			return q.parse(source);
		};
		return parser;
	}
	
	// VarArgs ... para recibir n parsers
	@SafeVarargs
	static <I, T, R> Parser <I, List<T>, R> Seq(Parser<I, T, R>... parsers){
		
		Parser<I, List<T>, R> parser = (I source) -> {
			List<T> results = new ArrayList<>();
			for (var p : parsers) {
				var result = p.parse(source);
				switch ( result ){
					case Fail(R reason) -> {
						return new Fail<I, List<T>, R>(reason);
					}
					case Ok(T token, I rest) -> {
						results.add( token );
						source = rest;
					}
				};
			}
			
			return new Ok<I, List<T>, R>(results, source);
			
		};
		
		return parser;
	}
	
	
	
	@SafeVarargs
	static <I, T, R> Parser <I, T, R> Or(Parser<I, T, R>... parsers){
		Parser<I, T, R> parser = (I source) -> {
			if(parsers.length == 0)
				return new Fail<I, T, R>(null);
			var result = parsers[0].parse(source);
			switch ( result ){
				case Fail(R reason) -> {
					return Or(Arrays.copyOfRange(parsers, 1, parsers.length)).parse(source);
				}
				case Ok(T token, I rest) -> {
					return result;
				}
			}
		};
		
		return parser;
	}
	
	static <I, T, R> Parser <I, T, R> Optional(Parser<I, T, R> p){
		Parser<I, T, R> parser = (I source) -> {
			var result = p.parse(source);
			switch ( result ){
				case Fail(R reason) -> {
					return new Ok<I, T, R>(null, source);
				}
				case Ok(T token, I rest) -> {
					return new Ok<I, T, R>(token, rest);
				}
			}
		};

		return parser;
	}
	
	static <I, T, R> Parser <I, List<T>, R> Plus(Parser<I, T, R> p){
		Parser<I, List<T>, R> parser = (I source) -> {
			List<T> tokens = new ArrayList<>();
			var isOk = true;
			while (isOk) {
				var result = p.parse(source);
				switch ( result ){
				case Fail(R reason) -> {
					isOk = false;
					if(tokens.size() == 0)
						return new Fail<I, List<T>, R>(reason);
				}
				case Ok(T token, I rest) -> {
					tokens.add( token );
					source = rest;
				}
				};
			}
			return new Ok<I, List<T>, R>(tokens, source);
		};
		
		return parser;
	}
	
	static <I, T, R> Parser <I, List<T>, R> Star(Parser<I, T, R> p){
		Parser<I, List<T>, R> parser = (I source) -> {
			List<T> results = new ArrayList<>();
			var isOk = true;
			while (isOk) {
				var result = p.parse(source);
				switch ( result ){
				case Fail(R reason) -> {
					isOk = false;
				}
				case Ok(T token, I rest) -> {
					results.add( token );
					source = rest;
				}
				};
			}
			return new Ok<I, List<T>, R>(results, source);
		};
		
		return parser;
	}
}

/*

/////// Gramatica

nodePattern: "(" variable? labels? ")";
variable: Id;
labels: (":" variable) +;

*/

//////// Modelo AST

record NodePattern(Optional<String> variable, List<String> labels) {}

///////

class MiniCyphailGrammar {
	static Lexer Label(){
		var re_label = Pattern.compile("\\s*(?<token>:\\w+)");
		Lexer lexer = (InputString source) -> {
			var input = source.input();
			var index = source.index();
			
			var matcher = re_label.matcher(input);
			matcher.region(index, input.length());
			
			if(!matcher.lookingAt())
				return new Fail<>("No label could be match");

			var newSource = new InputString(input, matcher.end());
			var token = new TokenString(TToken.Literal, matcher.group("token"));
			
			return new Ok<>(token, newSource);
		};
		return lexer;
	}
	
	static Parser<InputString, List<TokenString>, String> NodePattern(){
		Parser <InputString, List<TokenString>, String> parser = (InputString source) -> {

			var openLexer = Lexers.Literal("(");
			var idLexer = Parsers.Optional(Lexers.Id());
			var labelsLexer = Parsers.Star(MiniCyphailGrammar.Label());
			var closeLexer = Lexers.Literal(")");

			List<TokenString> tokens = new ArrayList<>();

			switch (openLexer.parse(source)) {
				case Fail(String reason) -> {
					return new Fail<>(reason);
				}
				case Ok(TokenString token, InputString rest) -> {
					tokens.add(token);
					source = rest;
				}
			}

			switch (idLexer.parse(source)) {
				case Fail(String reason) -> {
					return new Fail<>(reason);
				}
				case Ok(TokenString token, InputString rest) -> {
					tokens.add(token);
					source = rest;
				}
			}

			switch (labelsLexer.parse(source)) {
				case Fail(String reason) -> {
					return new Fail<>(reason);
				}
				case Ok(List<TokenString> labelTokens, InputString rest) -> {
					tokens.addAll(labelTokens);
					source = rest;
				}
			}

			switch (closeLexer.parse(source)) {
				case Fail(String reason) -> {
					return new Fail<>(reason);
				}
				case Ok(TokenString token, InputString rest) -> {
					tokens.add(token);
					source = rest;
				}
			}

			return new Ok<>(tokens, source);
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
		var orLexer = new Parsers().Or(numLexer, idLexer);
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

void test_3(String title){
	IO.println(title);
	
	var inputs = List.of("abc 123 abc", "  123 abc", "", "123abc", "abc", "abc123 abcd");
	for (var input : inputs) {
		var numLexer = new Lexers().Number();
		var idLexer = new Lexers().Id();
		var seqParser = new Parsers().Seq(idLexer, numLexer, idLexer);
		var source = new InputString(input, 0);
		
		Result<InputString, List<TokenString>, String> result = seqParser.parse(source);
		switch (result) {
			case Ok<InputString, List<TokenString>, String> ok -> 
				IO.println(String.format(" ( Ok ) >>> Input = '%s' \n    List of Tokens: = '%s'", input, ok.token));
			case Fail<InputString, List<TokenString>, String> fail -> 
				IO.println(String.format(" (Fail) >>> Input = '%s' \n    Reason = '%s'", input, fail.reason));
		}
	}
}

void test_4(String title){
	IO.println(title);
	
	var inputs = List.of("abc 123 abc", "  123 abc", "", "123abc", "abc", "abc123 abcd");
	for (var input : inputs) {
		var numLexer = new Lexers().Number();
		var idLexer = new Lexers().Id();
		var source = new InputString(input, 0);
		var orLexer = new Parsers().Or(numLexer, idLexer);
		
		Result<InputString, TokenString, String> result = orLexer.parse(source);
		switch (result) {
			case Ok<InputString, TokenString, String> ok -> 
				IO.println(String.format(" ( Ok ) >>> Input = '%s' \n    Token = '%s'", input, ok.token));
			case Fail<InputString, TokenString, String> fail -> 
				IO.println(String.format(" (Fail) >>> Input = '%s' \n    Reason = '%s'", input, fail.reason));
		}
	}
}

void test_5(String title){
	IO.println(title);

	var inputs = List.of("abc def ghi 123", "abc", "123 abc", "");
	for (var input : inputs) {
		var idLexer = new Lexers().Id();
		var plusParser = new Parsers().Plus(idLexer);
		var source = new InputString(input, 0);

		Result<InputString, List<TokenString>, String> result = plusParser.parse(source);
		switch (result) {
			case Ok<InputString, List<TokenString>, String> ok ->
				IO.println(String.format(" ( Ok ) >>> Input = '%s' \n    List of Tokens: = '%s'", input, ok.token));
			case Fail<InputString, List<TokenString>, String> fail ->
				IO.println(String.format(" (Fail) >>> Input = '%s' \n    Reason = '%s'", input, fail.reason));
		}
	}
}

void test_6(String title){
	IO.println(title);

	var inputs = List.of("abc def ghi 123", "abc", "123 abc", "");
	for (var input : inputs) {
		var idLexer = new Lexers().Id();
		var starParser = new Parsers().Star(idLexer);
		var source = new InputString(input, 0);

		Result<InputString, List<TokenString>, String> result = starParser.parse(source);
		switch (result) {
			case Ok<InputString, List<TokenString>, String> ok ->
				IO.println(String.format(" ( Ok ) >>> Input = '%s' \n    List of Tokens: = '%s'", input, ok.token));
			case Fail<InputString, List<TokenString>, String> fail ->
				IO.println(String.format(" (Fail) >>> Input = '%s' \n    Reason = '%s'", input, fail.reason));
		}
	}
}


void test_7(String title){
	IO.println(title);

	var inputs = List.of("(", "   (", "(abc", ")", "", "abc");
	for (var input : inputs) {
		var literalLexer = new Lexers().Literal("(");
		var source = new InputString(input, 0);

		Result<InputString, TokenString, String> result = literalLexer.parse(source);
		switch (result) {
			case Ok<InputString, TokenString, String> ok ->
				IO.println(String.format(" ( Ok ) >>> Input = '%s' \n    Token = '%s'", input, ok.token));
			case Fail<InputString, TokenString, String> fail ->
				IO.println(String.format(" (Fail) >>> Input = '%s' \n    Reason = '%s'", input, fail.reason));
		}
	}
}

void test_8(String title){
	IO.println(title);

	var inputs = List.of("()", "   ()", "  (p)","  (p:Person)", "(_:Any:One)", "(p:Person:Employee:Player:Male)", "(p:Person", "", "abc");
	for (var input : inputs) {
		var nodePattern = new MiniCyphailGrammar().NodePattern();
		var source = new InputString(input, 0);

		Result<InputString, List<TokenString>, String> result = nodePattern.parse(source);
		switch (result) {
			case Ok<InputString, List<TokenString>, String> ok ->
				IO.println(String.format(" ( Ok ) >>> Input = '%s' \n    Tokens = '%s'", input, ok.token));
			case Fail<InputString, List<TokenString>, String> fail ->
				IO.println(String.format(" (Fail) >>> Input = '%s' \n    Reason = '%s'", input, fail.reason));
		}
	}
}


void main(){
    IO.println("\n*** Work.java Stars****\n"); 
	
	IO.println("Work.java is working okded");
	
	// test_0("~~~~~~~~~TEST 0~~~~~~~~~");
	// IO.println();
	// test_1("~~~~~~~~~TEST 1~~~~~~~~~");
	// IO.println();
	// test_2("~~~~~~~~~TEST 2~~~~~~~~~");
	// IO.println();
	// test_3("~~~~~~~~~TEST 3~~~~~~~~~");
	// IO.println();
	// test_4("~~~~~~~~~TEST 4~~~~~~~~~");
	// IO.println();
	// test_5("~~~~~~~~~TEST 5 (Plus)~~~~~~~~~");
	// IO.println();
	// test_6("~~~~~~~~~TEST 6 (Star)~~~~~~~~~");
	// IO.println();
	// test_7("~~~~~~~~~TEST 7 (Literal)~~~~~~~~~");
	IO.println();
	test_8("~~~~~~~~~TEST 8 (PatternNode)~~~~~~~~~");

    IO.println("\n*** Work.java Ends****\n");
}