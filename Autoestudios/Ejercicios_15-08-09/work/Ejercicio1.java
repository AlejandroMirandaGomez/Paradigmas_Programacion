enum TType {
    NUM, ID, OPER
}
interface Token<T>{
   TType ttype();
   T value();
}
interface Lexema<T>{
   TType ttype();
   T value();
}

<T> Token<T> foo(Token<T> x){return x;}

void main(){
   IO.println( foo( new Lexema<String>(){
       public TType ttype(){
           return TType.NUM;
       }
       public String value(){
           return "666";
       }
   } ) );
}
