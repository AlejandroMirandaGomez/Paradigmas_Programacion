graph(amigos).
graph(things).

node(amigos, a).
node(amigos, b).
node(amigos, c).
node(amigos, d).

node_lab(amigos, a, 'Person').
node_lab(amigos, a, 'Female').

node_lab(amigos, b, 'Person').
node_lab(amigos, b, 'Male').

node_lab(amigos, c, 'Animal').
node_lab(amigos, c, 'Male').

node_lab(amigos, d, 'Person').
node_lab(amigos, d, 'Female').

node_prop(amigos, a, active, true).
node_prop(amigos, b, active, false).
node_prop(amigos, c, active, false).
node_prop(amigos, d, active, true).

node_prop(amigos, a, role, super).
node_prop(amigos, b, role, user).
node_prop(amigos, c, role, user).
node_prop(amigos, d, role, user).

node_prop(amigos, a, name, 'Ana').
node_prop(amigos, b, name, 'Beto').
node_prop(amigos, c, name, 'Charlie').
node_prop(amigos, d, name, 'Diana').

edge(amigos, e1, a, a).
edge(amigos, e7, a, b).
edge(amigos, e2, a, c).
edge(amigos, e3, b, c).
edge(amigos, e4, b, d).
edge(amigos, e8, b, b).
edge(amigos, e5, c, d).
edge(amigos, e6, d, b).

:- dynamic current_graph/1.

set_current_graph(G) :- 
	(current_graph(_) -> retract(current_graph(_)); true), 
	assert(current_graph(G))
.

get_current_graph(G) :-
	current_graph(G)
.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ENGINE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

/*
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
*/
% Ejemplo de Codes: `get_node_label(P, 'Person')`

parse_evaluate_from_atom(Source, VN) :-
	atom_codes(Source, Codes),
	read_term_from_codes(Codes, Goal, [variable_names(VN)]), 
	call(Goal)
.

parse_evaluate_from_codes(Codes, VN) :-
	read_term_from_codes(Codes, Goal, [variable_names(VN)]), 
	call(Goal)
.

parse_evaluate(Codes, VN) :-
    catch(
        (
            read_term_from_codes(Codes, Goal, [variable_names(VN)]),
            call(Goal)
        ),
        Error,
        (
            format("Error evaluando la consulta: ~w~n", [Error]),
            fail
        )
    )
.

/*
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
*/

cy_path(G, N, M, Path, Options) :-
	get_labels(Options, Nlabs, Rlabs),
	get_strategy(Options, Strategy),
	get_repeatable(Options, RepNode, RepEdge),
	get_bounds(Options, G, Min, Max),
	node_matches_labels(G, N, NLabs),
	node_matches_labels(G, M, NLabs),
	( Strategy == bfs
    -> cy_path_bfs(G, N, M, NLabs, RLabs, RepNode, RepEdge, MinLen, MaxLen, Path)
    ;  cy_path_dfs(G, N, M, NLabs, RLabs, RepNode, RepEdge, MinLen, MaxLen, Path)
  ).

get_labels(Options, NLabs, RLabs) :- (
	member(labels(Nlabs0, Rlabs0), Options)
	-> 	NLabs = Nlabs0, RLabs = Rlabs0,
	; 	NLabs = [], RLabs = []
).

get_strategy(Options, Strategy) :-
    ( member(strategy(Strategy0), Options) -> Strategy = Strategy0 ; Strategy = dfs ).

get_repeatable(Options, RepNode, RepEdge) :-
    ( member(repeatable(RepNode0, RepEdge0), Options)
    -> RepNode = RepNode0, RepEdge = RepEdge0
    ;  RepNode = true, RepEdge = false
    ).

get_bounds(Options, G, Min, Max) :-
    ( member(bounds(Min0, Max0), Options)
    -> Min = Min0, Max = Max0
    ;  Min = 1, aggregate_all(count, edge(G, _, _, _), Max)
    ).

node_matches_labels(_, _, []) :- !.
node_matches_labels(G, N, Labs) :-
    once((member(L, Labs), node_lab(G, N, L))).

edge_matches_labels(_, _, []) :- !.
edge_matches_labels(G, E, Labs) :-
    once((member(L, Labs), edge_lab(G, E, L))).

% --- dfs ---

cy_path_dfs(G, N, M, NLabs, RLabs, RepNode, RepEdge, MinLen, MaxLen, Path) :-
    dfs_path(G, N, M, NLabs, RLabs, RepNode, RepEdge, MaxLen, [N], [], RevPath),
    length(RevPath, Len),
    Len >= MinLen,
    reverse(RevPath, Path).

dfs_path(_, M, M, _, _, _, _, _, _, Acc, Acc).
dfs_path(G, N, M, NLabs, RLabs, RepNode, RepEdge, MaxLen, VisitedNodes, Acc, Path) :-
    length(Acc, Len),
    Len < MaxLen,
    edge(G, E, N, N2),
    ( RepEdge == false -> \+ member(E, Acc) ; true ),
    ( RepNode == false -> \+ member(N2, VisitedNodes) ; true ),
    edge_matches_labels(G, E, RLabs),
    node_matches_labels(G, N2, NLabs),
    dfs_path(G, N2, M, NLabs, RLabs, RepNode, RepEdge, MaxLen,
              [N2|VisitedNodes], [E|Acc], Path).

% --- bfs ---

cy_path_bfs(G, N, M, NLabs, RLabs, RepNode, RepEdge, MinLen, MaxLen, Path) :-
    bfs_levels(G, [state(N, [N], [])], M, NLabs, RLabs, RepNode, RepEdge,
               MinLen, MaxLen, 0, Path).

bfs_levels(_, Frontier, M, _, _, _, _, MinLen, _, Len, Path) :-
    Len >= MinLen,
    member(state(M, _, RevPath), Frontier),
    reverse(RevPath, Path).
bfs_levels(G, Frontier, M, NLabs, RLabs, RepNode, RepEdge, MinLen, MaxLen, Len, Path) :-
    Len < MaxLen,
    expand_frontier(G, Frontier, NLabs, RLabs, RepNode, RepEdge, NextFrontier),
    NextFrontier \= [],
    Len1 is Len + 1,
    bfs_levels(G, NextFrontier, M, NLabs, RLabs, RepNode, RepEdge,
               MinLen, MaxLen, Len1, Path).

expand_frontier(G, Frontier, NLabs, RLabs, RepNode, RepEdge, NextFrontier) :-
    findall(
        state(N2, [N2|Visited], [E|RevPath]),
        ( member(state(N, Visited, RevPath), Frontier),
          edge(G, E, N, N2),
          ( RepEdge == false -> \+ member(E, RevPath) ; true ),
          ( RepNode == false -> \+ member(N2, Visited) ; true ),
          edge_matches_labels(G, E, RLabs),
          node_matches_labels(G, N2, NLabs)
        ),
        NextFrontier
).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

get_node_label(N, Lab) :-
	get_current_graph(G),
	node_lab(G, N, Lab).

% nombre objeto_accion_things
node_all_labs(G, N, Labs) :-
	findall(Lab, node_lab(G, N, Lab), Labs)
.

node_all_labs(N, Labs) :-
	get_current_graph(G),
	node_all_labs(G, N, Labs)
.

node_satisfies_labs(G, N, Labs) :-
	forall(member(Lab, Labs), node_lab(G, N, Lab))
.

node_all_props(G, N, Props) :-
	findall(Name:Value, node_prop(G, N, Name, Value), Props)
.

node_all_props(N, Props) :-
	get_current_graph(G),
	node_all_props(G, N, Props)
.


	


%%%%%%%%%%%%%%%%%%%%%%%%%%%%% TESTING %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

/*
Match (p:Person:Male {active:true, role:'user'}),
	  (q:Person:Female {active:false, role:'user'}) 
	Where q.age < p.age
	Return p.name, q.name
*/

/*
Match (p:Person:Male {active:true, role:'user'}),
	  (q:Person:Female {active:false, role:'user'}) 
	Where q.age < p.age
	Return p.name, q.name
*/

% TDD: Test Developer Driver
test_1 :-
	writeln('**** Generator Test 1 Starts ****'),
	
/*
Match (p:Person:Male)
*/
	
	AST = patt(
					id(p), 
					labs([id('Person'), id('Male')])
					),
	
	writeln(AST), nl,
	
	generate(AST, Code),
	% Expected Code = ´node_all_props(P, P_Props), all_in(['Person', 'Male'], P_PLabs)´, ['p' = 'P'],
	
	writeln(Code), nl,
	
	writeln('****  Generator Test 1 Ends  ****')
.

generate(_AST, _Code) :-
	writeln('Not implemented yet!')
.

