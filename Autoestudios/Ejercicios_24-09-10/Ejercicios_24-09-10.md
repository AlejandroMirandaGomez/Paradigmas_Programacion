___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 09/10/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente

## Ejercicios
0. Termine el dibujo del árbol de prueba del ejemplo planteado en clase.
 
1. Considere este çódigo (no hace nada especial).
```prolog
p :- q, r.   %R1
p.           %R2
q :- s.      %R3
r :- p, s.   %R4
s.           %R5
```
Dibuje el `árbol de prueba` del query `p` y explique el problema que se presenta. ¿Hay manera de arreglarlo sin cambiar la semántica del código?

2. Escriba `fibo(+N, -F)` que calcule el `N`-ésimo número de fibonacci en `F`, y que sea recursiva de cola (`tail-recursive`).

3. Considere este `spec`
```prolog
/*
distance(+P, +LP, -NP) : para cualquier persona
 P de la forma person(Name, Age) y 
 LP una lista de personas, con esa misma forma,
 NP (Nearest Persons) es la lista de personas 
 Q en `LP` más cercanas en valor absoluto a `P`
 por edad. 
 Si `LP` es vacía `NP` es vacía.
*/
```
Implemente `distance`. Hago casos de prueba como el siguiente.
```prolog
test_1 :-
   P = person(juan, 22),
   LP = [
      person(ana, 28),   % distance |22-28|=6
      person(pedro, 18), % distance |22-18|=4
      person(jorge, 26)  % distance |22-26|=4
   ],
   distance(P, LP, NP),
   format('Person: ~w. Nearest: ~w',[P, NP])  
.
:- test_1.
```

Prueba (asumiendo `work.pl` como su archivo de trabajo)
```bash
swipl -q -s work.pl

Person: person(juan, 22).
Nearest: [person(pedro, 18), person(jorge, 26)]

```



