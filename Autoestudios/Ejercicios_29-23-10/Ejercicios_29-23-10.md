___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 27/10/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente

## Ejercicios

1. En `Prolog` el modelo try-catch se modela con el metapredicado `catch(Goal, Error, GoalSurrogate)` donde se intenta (try) con el `Goal`. Si no hay excepción equivale a haber hecho `call(Goal)`. Si la hay, entonces `E` tiene un compund de error y se hace `call(GoalSurrogate)`.

Ejemplo
```prolog 
?- catch(X is 1/0, E, X is 0).
X = 0,
E = error(evaluation_error(zero_divisor), context((/)/2, _)).
```
Hay también `throw` para levantar excepciones.
Ejemplo:
```prolog
?- throw(error(verdad_absoluta('feo el team'), context(playing, 'campeonato 2026'))).
ERROR: Unknown error term: verdad_absoluta('feo el team') (campeonato 2026)
ERROR: In:
ERROR:   [12] throw(error(verdad_absoluta('feo el team'),context(playing,'campeonato 2026')))
ERROR:   [11] toplevel_call(user:user: ...) at c:/program files/swipl/boot/toplevel.pl:1529
```
Añada manejo de errores al predicado `parse_eval` (o `parse_evaluate`, según el horario)

En la siguiente  pregunta, considere siempre el objetivo del modelo `generator.pl` de un generador de código para `AST`s de `Cyphail` y su engine. Estos ejercicios buscan ir *engordando* el engine de forma que simplifique la generación de código desde `Java`. La pregunta aborda el problema de cálculo de caminos entre nodos. Por ejemplo, considere algo como:
```sql
MATCH path = (a:Person {name: 'Ana'})
                -[:knows*1..3]->
             (b:Person {name: 'Beto'})
RETURN path
```
Considere este ejercicio como una parte de `Cyphail P2` que van a ocupar.

2. [**Reto**] Escriba como parte del seudo-engine que se ha ido creando en clase `cy_path(G, N, M, Path, Options)` que trate de retornar en `Path` un camino (lista de arcos (edges)) `[E_1, E_2, ..., E_k]` tales que en el grafo `G` desde el nodo `N` se llega al nodo `M` usando esos arcos (relationships) `E_i`  en ese orden. La lista `Options` de opciones incluye:
- `labels(N, R)`, para que use solo arcos que tengan etiquetas que estén en la lista `R` y nodos que tengan etiquetas en la lista `N`. Asuma que ambas son listas de átomos. 
- `strategy(S)` que dice cuál estrategia de búsqueda  usar (átomos `dfs` y `bfs`). 
- `repeatable(FlagNode, FlagEdge)` indica si se vale o no repetir nodos, o arcos (`true` o `false`).
- `bounds(A, B)` mínimo y máximo inclusivos del largo del camino, `A` y `B` siendo números con `A<=B`.

