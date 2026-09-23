/**
* Original TS model (migrated to Java) below:
* @author loriacarlos@gmail.com 
* @since September 2026
*/

/*
type TResult = "OK" | "FAIL"

type Ok<I, T> = {
    _type: TResult,
    token: T,
    rest: I
}
type Fail<R> = {
    _type: TResult,
    reason:R
} 

type Result<I, T, R> = Ok<I, T> | Fail<R>

type InputString = {
    input: string,
    index: number
}
type TToken = "NUM" | "ID" // ... more 

type Token = {
    _type: TToken,
    value:string
}

*/

/**
   Java model
   General Interfaces
   Models for 
       * Results of parsing
       * Inputs to Lexing and Parsing
       * Tokens and its types 
       * Lexers y Parsers Combinators
            * Generics Seq, Or, Star, etc.
       * Simple use test cases
*/

/**
  * Monadic-style Datatypes for 
    * Results of parsing/lexing
    * Inputs to a lexer/parser 
    * Tokens 
    
*/
sealed interface Result<I, T, R> permits Ok, Fail{
}
record Ok<I, T, R>(T token, I rest) implements Result<I, T, R>{}

record Fail<I, T, R>(R reason) implements Result<I, T, R>{}

interface Input<T>{
    T input();
    int index();
}

record InputString(String input, int index) implements Input<String>{
}

enum TToken{
    NUM,
    ID,
    LPAR, RPAR,
    COLON
}

interface IToken<T>{
    TToken type();
    T value();
}

record TokenString(TToken type, String value) implements IToken<String>{}

interface Parser<I, T, R>{
   Result<I, T, R> parse(I source);
}

interface Lexer extends Parser<InputString,
                               TokenString,
                               String
                              >{}
//////////////////////// LEXING ///////////////////
/*
  Lexer combinators for numbers, identifiers, etc
*/
class Lexers {
    
    static Lexer Number(){
        var re_num = Pattern.compile("\\s*(?<token>\\d+)");
        
        Lexer lexer = (InputString source) -> {
            var matcher = re_num.matcher(source.input());
            matcher.region(source.index(),
                           source.input().length()); 
                           
            if ( ! matcher.lookingAt() ){
                return new Fail<>("No number could be matched");
            }
            
            var token = matcher.group("token");
            return new Ok<>( new TokenString(TToken.NUM, token),                 new InputString(source.input(), 
                                       matcher.end() ));
             
        };
        
    return lexer;    
        
    }
    
    static Lexer Id(){
        var re_id = Pattern.compile("\\s*(?<token>[a-zA-Z_]\\w*)");
        
        Lexer lexer = (InputString source) -> {
            var matcher = re_id.matcher(source.input());
            matcher.region(source.index(),
                           source.input().length()); 
                           
            if ( ! matcher.lookingAt() ){
                return new Fail<>("No id could be matched");
            }
            
            var token = matcher.group("token");
            return new Ok<>( new TokenString(TToken.ID, token),                 new InputString(source.input(), 
                                       matcher.end() ));
             
        };
        
    return lexer;    
        
    }
    
    static Lexer Special(TToken type, String re){
        var re_pat = Pattern.compile(re);
        Lexer lexer = (InputString source) -> {
            var matcher = re_pat.matcher(source.input());
            matcher.region(source.index(),
                           source.input().length()); 
                           
            if ( ! matcher.lookingAt() ){
                return new Fail<>(String.format("No %s could be matched", type));
            }
            
            var token = matcher.group("token");
            return new Ok<>( new TokenString(type, token),                 new InputString(source.input(), 
                                       matcher.end() ));
            
        };
        return lexer;
    }
    static Lexer LPAR = Special(TToken.LPAR, "\\s*(?<token>\\()");
    static Lexer RPAR = Special(TToken.RPAR, "\\s*(?<token>\\))");
    static Lexer COLON = Special(TToken.COLON, "\\s*(?<token>:)");  
}
//////////////////////// PARSING ///////////////////////
class Parsers {
    @SafeVarargs
static <I, T, R> Parser<I, T, List<R>> Or(Parser<I, T, R>...  parsers){
        
        Parser<I, T, List<R>> parser = (I source) -> {
            var reasons = new ArrayList<R>();
            for (var p : parsers){
                switch ( p.parse(source) ){
                   case Fail(R reason) -> {
                       reasons.add( reason );
                   }
                   case Ok(T token, I rest) -> {
                       return new Ok<I, T, List<R>>( token, rest);
                   }                     
                    
                };
                
            };
            return new Fail<I, T, List<R>>(reasons);
           
        };
        
        return parser;
        
    }
    @SafeVarargs
    static <I, T, R> Parser<I, List<T>, R> Seq(Parser<I, T, R>... parsers){
		Parser<I, List<T>, R> parser = (I source) -> {
			List<T> results = new ArrayList<>();
			for (var p : parsers){
				switch ( p.parse( source ) ){
					case Fail(R reason) -> {return new Fail<I, List<T>, R>( reason );}
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

    static <I, T, R> Parser<I, List<T>, R> StarIterativo(Parser<I, T, R> parser){
        Parser<I, List<T>, R> pstar = (I source) -> {
           var tokens = new ArrayList<T>();
           trying:
           while( true ){
               
               switch ( parser. parse(source) ){
                   case Ok(T token, I rest) -> {
                       tokens.add( token );
                       source = rest;
                       
                   }
                   case Fail(R _) -> {
                       break trying;
                   }
               };
           }
           return new Ok<I, List<T>, R>(tokens, source);
               
        };
        return pstar;
    }
	
	static <I, T, R> Parser<I, List<T>, R> Star(Parser<I, T, R> parser){
        Parser<I, List<T>, R> pstar = (I source) -> {
           var tokens = new ArrayList<T>();
		   
		   
		   var resultados = new ArrayList<I, T, R>[]
		   var newSource = source;
		   
		   record monad<<<I, T, R>[]>>(resultados, newSource)
		   
		   Stream.iterate(monad, parser.parse(source)))
		   .filter(r instanceof ok).findAny() 
        };
        return pstar;
    }
	
	
   
   /**
       TFlat and RFlat serve as Parsers transformers of those that return a List of Tokens (Seq, Star) or Results (Or). 
       They concatenate the corresponding List to just one result using a paramterized lambda
    */
    static <I, T, R> Parser<I,T, R> TFlat(Parser<I, List<T>, R> p, Function<List<T>, T> cat){
        return (I source) -> switch( p.parse( source ) ){
            case Fail(R reason) -> new Fail<I, T, R>(reason);
            case Ok(List<T> tokens, I rest) -> new Ok<I, T, R>(cat.apply(tokens), rest);
        };
        
    }
    static <I, T, R> Parser<I, T, R> RFlat(Parser<I, T, List<R>> p, Function<List<R>, R> cat){
        return (I source) -> switch( p.parse( source ) ){
            case Fail(List<R> reasons) -> new Fail<I, T, R>(cat.apply(reasons));
            case Ok(T token, I rest) -> new Ok<I, T, R>(token, rest);
        }; 
    }

}
/////////////////////// SAMPLE GRAMMAR ////////////////////////

/**
  InputToken is the analagous of InputString but uses a list of Tokens instead of a String.
*/
record InputToken(List<TokenString> input, int index) implements Input<List<TokenString>>{
    
    public InputToken(List<TokenString> input){
        this(input, 0);
    }
    
    public InputToken next(){
        return new InputToken(input, index + 1);
    }
    
    public boolean isEmpty(){
        return index() >= input().size();
    }
    public TokenString first(){
        return input().get(index);
    }
}

/**
  * Simulates a **minimalist** simple Ast
  * Just for demo purposes
  * Change and expand 
*/
sealed interface Ast permits Leaf, Node{
}
record Leaf(TokenString t) implements Ast{}
record Node(List<Ast> children) implements Ast{}

class Grammar {
   /** 
    * Just a bunch of lexers we'll be using. 
    * More can be added
   */
   static Lexer LPAR = Lexers.LPAR;
   static Lexer RPAR = Lexers.RPAR;
   static Lexer COLON = Lexers.COLON;
   static Lexer ID = Lexers.Id();
   static Lexer NUM = Lexers.Number();
  //...

  /** 
     Gathers the next token and wraps it as Leaf(token) inside a Result
     
  */
  static  Result<InputToken, TokenString, String> eat(TToken type, InputToken source){
      if ( source.isEmpty() )
          return new Fail<>(String.format("Expecting token %s. Found empty source", type));
      var token = source.first();
      if ( token.type() != type )
          return new Fail<>(String.format("Expecting token %s. Found %s", type, token.type()));
      
      return new Ok<>(token, source.next());
  }      
   /**
      Converts a Lexer into a Parser<InputToken, Ast, String>
      Wraps the token inside a Leaf
   */
   static Parser<InputToken, Ast, String> parsify(TToken type){
       Parser<InputToken, Ast, String> parser = (InputToken source) -> switch( eat(type, source) ){
               case Fail(String reason) -> new Fail<>(reason);
               case Ok(TokenString token, InputToken rest) -> new Ok<>(new Leaf(token), rest);
       };
       return parser;
   }
   /**
     Helper function  just to concat a List of Strings separated by an "&"
     cat = concat
   */
   static Function<List<String>,String> catStringList = (List<String> list) -> String.join(" & ", list);
   
   /**
     AnyToken is just a Parser.Or of all tokens that concats the possibly failing reasons in just one string reason (using catStringList and & as a separator.
     
     Add more Lexers that you need
   */   
   static Parser<InputString, TokenString, String> AnyToken = Parsers.RFlat( Parsers.Or(ID, NUM, COLON, LPAR, RPAR),
                  catStringList)
   ;
   /**
      tokenize a String or InputString into a List of TokenStrings
      Two overloads available
   */
   static List<TokenString> tokenize(String source){
        return tokenize(new InputString(source, 0));
   }
   
   static List<TokenString> tokenize(InputString source){
        var tokenizer = Parsers.Star( AnyToken );
        return switch( tokenizer.parse(source) ){
            case Ok(List<TokenString> tokens, InputString rest) ->
              tokens;
            case Fail(String reason) -> throw new RuntimeException( reason );
        };
        
    }
    
   /*
     Pre-computed Parsers from Lexers
     Add more as needed
   */
   static Parser<InputToken, Ast, String> lparen = parsify(TToken.LPAR);
   static Parser<InputToken, Ast, String> rparen = parsify(TToken.RPAR);
   static Parser<InputToken, Ast, String> colon = parsify(TToken.COLON);
   static Parser<InputToken, Ast, String> variable = parsify(TToken.ID);
   static Parser<InputToken, Ast, String> num = parsify(TToken.NUM);
   
   /**
      Demo Rule as Parser (no labels yet!)
      nodePattern : "(" variable ")"
   */
   static Parser<InputToken, List<Ast>, String> nodePattern = Parsers.Seq(lparen, variable, rparen);
   
}
////////////////// TESTING /////////////////////

void test_0(String title){
    IO.println(title);
    var inputs = List.of("123", "");
    for (var input : inputs){
        var numLexer = Lexers.Number();
        var source = new InputString(input, 0);
        var result = numLexer.parse(source);
        IO.println(String.format(">>> Input=%s Result=%s", input, result));
    }
    IO.println();
}
///////////////////////// TESTING /////////////////////
void test_1(String title){
    IO.println(title);
    var inputs = List.of("abc", "");
    for (var input : inputs){
        var idLexer = Lexers.Id();
        var source = new InputString(input, 0);
        var result = idLexer.parse(source);
        IO.println(String.format(">>> Input=%s Result=%s", input, result));
    }
    IO.println();
}

void test_2(String title){
    IO.println(title);
    var inputs = List.of("abc", "123","");
    for (var input : inputs){
        var idLexer = Lexers.Id();
        var numLexer = Lexers.Number();
        var orParser = Parsers.Or(idLexer, numLexer);
        var source = new InputString(input, 0);
        var result = orParser.parse(source);
        IO.println(String.format(">>> Input=%s Result=%s", input, result));
    }
    IO.println();
}

void test_3(String title){
    IO.println(title);
    var inputs = List.of("abc 123 xyz", ": abc");
    for (var input : inputs){
        var idLexer = Lexers.Id();
        var numLexer = Lexers.Number();
        var orParser = Parsers.Seq(idLexer, numLexer, idLexer);
        var source = new InputString(input, 0);
        var result = orParser.parse(source);
        IO.println(String.format(">>> Input=%s Result=%s", input, result));
    }
    IO.println();
}

void test_4(String title){
    IO.println(title);
    var inputs = List.of("(", ")", ":");
    for (var input : inputs){
        var orParser = Parsers.Or(Lexers.LPAR, Lexers.RPAR);
        var source = new InputString(input, 0);
        var result = orParser.parse(source);
        IO.println(String.format(">>> Input=%s Result=%s", input, result));
    }
    IO.println();
}


void test_5(String title){
    IO.println(title);
    var inputs = List.of(" (p)", ")");
    for (var input : inputs){
        var tokens = Grammar.tokenize( input );
        var source = new InputToken( tokens );
        var result = Grammar.nodePattern.parse( source );
        IO.println(String.format(">>> Input=%s Result=%s", input, result));
    }
    IO.println();
}

void main(){   
	
	IO.println("Work.java is working ok");
    
    //test_0("*** Test 0 ***");
    
    //test_1("*** Test 1 ***");
    
    //test_2("*** Test 2 ***");

    //test_3("*** Test 3 ***");
    
    //test_4("*** Test 4 ***");
    test_5("*** Test 5 ***");

}