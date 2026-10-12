___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 06/10/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente

## Ejercicios
0. Determine si la siguiente ecuación de compounds (ASTs) de Prolog tiene solución (es decir, los ASTs son unificables). Sí indique los "bindings" de las variables `X, Y, Z`. Dibuje primero los ASTs
```Prolog
p(Z + h(f(X), Y)) = p(f(Y) + h(Y, f(b)))
```
 
1. Las listas en Prolog son una clase compounds con una sintaxis especial. Para listas (similar a JS) se usan corchetes separados por comas. Ejemplo `[1, 2, [3, 4], 5]`. Para efectos de unificación se usa esta notación `[F | R]` que denota la lista cuyo primer elemento es `F` y la lista con el resto de elementos es `R`. Ejemplos:
- `[]` es la lista nula.
- `[1,2,3] = [F | R]` unifican con `F=1, R=[2,3]`
- `[1] = [F | R]` unifican con `F=1, R=[]`
- `[1,2,3] = [F, S | R]` unifican con `F=1, S=2, R=[3]`

Estudie estas clásulas sobre listas y trate de entender  los tipos de facts que representan: Por ejemplo, el primero sirve para probar si una lista `L` está vacía. Por ejemplo `is_empty(L) determina si L es una lista vacía`.
```Prolog
is_empty([]).
is_unitary([_]). 
is_not_empty([_|_]).
is_simple(L) :- is_empty(L);is_unitary(L).
```
¿Cómo sería un `fact first(F, L)` que sea verdadero si `F` es el primer elemento de una lista `L`.
Note en `simple` se usa el `;` que es un `or`.

2. Refiérase a `work.pl` y el modelo de grafos. ¿Qué declara la siguiente cláusula?
```Prolog
schleife(G, E) :-
    graph(G),
    edge(G, N, E, N).
```

3. **Reto**. Escriba `transitive_amigo(G, A, TA)` que sería verdadera si en el grafo `G`, el nodo `A` es un amigo transitivo (en un solo paso) del nodo `AT`. Es decir, si existe un nodo puente `P` tal que `A` es amigo de `P` y este es amigo de `TA`.
```Prolog
transitive_amigo(G, A, TA) :- /* su respuesta */.
```

