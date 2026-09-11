___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 08/09/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente
## Ejercicios
1. Es siguiente código no pasa el typer de `Java` a pesar de que claramente  `Token<T>` y `Lexema<T>` tienen exactamente la misma signatura interna. Explique qué lo justifica.
```java
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

```
2. [**Para AInvestigar**] Entendemos en esta pregunta por `tipado estructural` aquel en que dos tipos agregados definidos por el usuario (como structs, clases, interfaces, records), declarados de forma independiente, son compatibles o intercambiables solamente por tener la misma forma, sin que ninguno declare herencia o implementación explícita del otro, y sin importar el sitio en el código donde fueron declarados.

¿Qué porcentaje de lenguajes entre `Go`, `OCaml`, `Rust`, `Kotlin`, `Python/Protocol` usan  `tipado estructural`. Dar ejemplos de código en los que se permita.

3.[**Reto**] Escriba un método `long fibo(int n)` que sin usar loops ni recursión calcule el `n`-ésimo número de *Fibonacci*. Asuma que `fibo(0) == fibo(1) == 1`. **Hint**: Estudie los combinadores `iterate`, `skip`, `findFirst` y la clase (monádica) `Optional`.

