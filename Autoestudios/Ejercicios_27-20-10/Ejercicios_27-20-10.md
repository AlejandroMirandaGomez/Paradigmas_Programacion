___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 17/20/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente

## Ejercicios
1. Escriba `fibo(+N, -F)` que retorne en `F` el `N`-ésimo número de Fibonacci, usando `foldl`.
2. Estudie este código y explique que hace `reduce`. 
```prolog

% Se declara `one` a ser un predicado dinámico 
% de un argumento.
:- dynamic one/1.
 
register(X) :- one(X), !.
register(X) :- assert(one(X)).

process([F | R]) :-
   retract(one(F)), !, process(R).
process([]).

reduce(L, SL) :- forall(member(X, L), register(X)),
                 process(SL).  
```  
3. **[Reto]**  Implemente `my_findall(-P, :G, ?LP)` que haga lo mismo que el `findall` de Prolog. 






