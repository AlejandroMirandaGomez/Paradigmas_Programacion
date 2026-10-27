___________________________________________________________

UNA
EIF400-II-2026 Paradigmas de Programación

**Tema**: Listas y `maplist` en Prolog — ejemplos de referencia
___________________________________________________________

## 1. `all_in(+L, +M)` — todos los elementos de `L` pertenecen a `M`

### Versión con `maplist`
```prolog
all_in(L, M) :- maplist([X]>>member(X, M), L).
```

### Versión con recursión
```prolog
all_in([], _).
all_in([X|Xs], M) :- member(X, M), all_in(Xs, M).
```

Ambas se comportan igual:
```
?- all_in([a,b], [a,b,c]).
true.
?- all_in([a,d], [a,b,c]).
false.
?- all_in([], [a,b,c]).
true.
```

La versión con `maplist` delega el recorrido de `L` en `maplist`, que internamente hace la misma recursión que se escribe a mano en la segunda versión. El caso base `all_in([], _)` equivale a que `maplist` termine con éxito al llegar a la lista vacía; el paso recursivo `member(X, M), all_in(Xs, M)` equivale a que `maplist` aplique `member(X, M)` a cada elemento.

SWI-Prolog ya trae esto en `library(lists)` como `subset(+SubSet, +Set)`.

## 2. `none_in(+L, +M)` — ningún elemento de `L` pertenece a `M`

```prolog
none_in(L, M) :- maplist([X]>>(\+ member(X, M)), L).
```

```
?- none_in([x,y], [a,b,c]).
true.
?- none_in([x,b], [a,b,c]).
false.
```

Es el mismo patrón que `\+ (edge(...), node_satisfies_labels(...))` usado en `match2` del autoestudio 28-23-10: negar la pertenencia de cada elemento.

## 3. `some_in(+L, +M)` — al menos un elemento de `L` pertenece a `M`

No es un caso de "para todos", así que `maplist` no aplica directo. Se usa `member/2` no determinista:

```prolog
some_in(L, M) :- member(X, L), member(X, M), !.
```

```
?- some_in([x,b], [a,b,c]).
true.
?- some_in([x,y], [a,b,c]).
false.
```

## 4. `member/2` — verificador y generador

Definición:
```prolog
member(X, [X|_]).
member(X, [_|T]) :- member(X, T).
```

- **Como verificador** (`X` instanciado): recorre la lista hasta unificar `X` con algún elemento.
  ```
  ?- member(b, [a,b,c]).
  true.
  ```
- **Como generador** (`X` variable): cada backtrack produce un valor distinto, de a uno por vez, no todos de golpe.
  ```
  ?- member(X, [a,b,c]).
  X = a ;
  X = b ;
  X = c ;
  false.
  ```

Si `M` tiene elementos repetidos y `X` está instanciado, `member(X, M)` puede tener éxito más de una vez (una por cada ocurrencia).

## 5. `maplist/2` — todos los elementos cumplen un predicado

Mismo patrón que `node_satisfies_props/3` y `node_satisfies_labels/3` del autoestudio 28-23-10:

```prolog
todos_mayores_que(L, N) :- maplist([X]>>(X > N), L).
```

```
?- todos_mayores_que([5,8,10], 4).
true.
```

## 6. `maplist/3` — transformar dos listas en paralelo

Cuando no es un chequeo sino una correspondencia elemento a elemento:

```prolog
duplicar(L, L2) :- maplist([X,Y]>>(Y is X*2), L, L2).
```

```
?- duplicar([1,2,3], R).
R = [2,4,6].
```

## 7. `include`/`exclude` — filtrar en vez de responder sí/no

Complementa a `all_in/2`: si se necesita saber *cuáles* elementos sí o no pertenecen, no solo si todos cumplen:

```prolog
pertenecientes(L, M, Si) :- include([X]>>member(X, M), L, Si).
no_pertenecientes(L, M, No) :- exclude([X]>>member(X, M), L, No).
```

```
?- pertenecientes([a,d,c], [a,b,c], Si).
Si = [a, c].
```

## 8. `foldl` como alternativa a `maplist` para "todos cumplen"

```prolog
all_in_foldl(L, M, Resultado) :-
    foldl([X, Acc0, Acc1]>>(member(X, M) -> Acc1 = Acc0 ; Acc1 = false),
          L, true, Resultado).
```
