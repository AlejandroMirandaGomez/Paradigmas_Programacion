___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 25/08/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente
## Ejercicios
1. Escriba un combinador `composition<T>(...funs[Fun<T>])` que retorne una lambda `f` tal que si `funs= [f_{1}, f_{2],..., f_{n-1}, f_{n}]`  entonces `f(x) = f_{n}(f_{n-1}(...f_{2}(f_{1}(x))))`. Asuma la declaración `type Fun<T> = (x:T) => T`. Si `n=0` entonces `composition` retorna la función identidad sobre `T`, es decir, `const id:Fun<T> = <T>(x:T) => x`. Pruebe con `const queHace = composition(x => x**2, x => x - 2*x, x => x + 1)`. Calcule a mano cuál función es `queHace`. Al final tipifique su solución de forma  que TS esté conforme con sus tipos. Solo use `FP`.


2. Recuerde el operador lógico `nand`. Recuerde que con él podemos simular todos los demás (`and`, `or`, `not`, `xor`). Ver [Wikipedia nand](https://es.wikipedia.org/wiki/L%C3%B3gica_NAND). Haga un combinador de predicados `nand<T>(f:Pred<T>, g:Pred<T>):Pred<T>` que implemente el operador. Luego implemente los demás operadores lógicos.

3. Haga una y pruebe una expresión regular en `JS` que describa horas en entre 0 y 23. Haga pruebas que pasan y que no pasan. **Nota**: Las expresiones regulares tienen un método `re_horas.exec(s:string)`, donde `re_horas` sería su expresión regular. Devuelve `null` si falla y un objeto de `match` con los detalles. Recomiendo pedirle a la IA que la haga y que les explique en detalle los operadores usados.

