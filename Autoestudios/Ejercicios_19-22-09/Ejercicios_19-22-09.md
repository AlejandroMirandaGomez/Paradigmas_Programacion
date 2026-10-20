___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 22/09/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente

## Ejercicios

0. Explique cuál es la noción y rol intuitivo en `FP` de una `Monad`. 
Por ejemplo, esta es una posible definición minimalista en `Java` de una `Monad`:

```java
interface Monad<T> {
    /**
     * Formalmente "bind" 
     * Aplica una función (f: T -> R) al valor `v` en la Monad y retorna una nueva Monad<R>,
     * con valor `f(v)`
     */
    <R> Monad<R> flatMap( Function<T, Monad<R>> f );

    /**
     * Conveniencia, no es parte estricta de la formal mínima
     * de Monad.
     */
    default <R> Monad<R> map( Function<T, R> f ) {
        return flatMap(value -> of( f.apply(value)) );
    }

    /**
     * Formalmente "return" / "pure" / "unit"
     * Factory de una Monad<R>
     */
    <R> Monad<R> of(R value);
}
```

Ahora, conteste:

    a. ¿Es `Promise` en `JS/TS` una `Monad`?
    b. ¿Es `Result<I, T, R>` una `Monad`?

1. Escriba `Integer fibo(int n)` que retorne el `n`-ésimo número de Fibonacci. Donde `fibo(0) == fibo(1) == 1`. No use recursión. 

##### En el modelo de `Work.java` entregado hoy:

2. `Parsers:`Considere `Seq` y `Star`: Mueva c/u a `FP` sin alterar su funcionalidad (pero no use `.forEach`).

3. `Grammar`:
   Crear un `Seq` que devuelva un `Parser<TokeInput, Ast, String>`
   **Hint**: Use `Parsers.Seq` y `Grammar.TFlat`
   
4. Diseñe un combinador en `Parsers` así:
 ```java
  static Parser<I, Optional<T>, R> 
      Opt(Parser<I, T, R> parser) {
   ...
  }
 ``` 
 que simula un parsing opcional (como el operador `?` de una Regex.) 




