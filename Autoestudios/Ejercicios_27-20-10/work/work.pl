graph(amigos).
graph(things).

node(things, a).
node(things, car).


node(amigos, a).
node(amigos, b).
node(amigos, c).
node(amigos, d).

node_label(amigos, a, 'Person').
node_label(amigos, a, 'Male').

node_prop(amigos, a, 'name', 'Juan').

edge(amigos, e0, a, a).
edge(amigos, e1, a, b).
edge(amigos, e2, a, c).
edge(amigos, e3, b, c).
edge(amigos, e4, b, d).
edge(amigos, e5, c, d).
edge(amigos, e6, d, b).

edge(things, e0, a, car).

/*
1. Escriba `fibo(+N, -F)` que retorne en `F` el `N`-ésimo número de Fibonacci, usando `foldl`.
*/

fibo_reduce(_, [Prev,Curr], [Curr,Next]) :- Next is Prev + Curr.

fibo(N, F) :- numlist(1, N, L), foldl(fibo_reduce, L, [0, 1], F).

/*
2. Estudie este código y explique que hace `reduce`. 
*/

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
	
/*
3. **[Reto]**  Implemente `my_findall(-P, :G, ?LP)` que haga lo mismo que el `findall` de Prolog. 
*/

:- dynamic temp/1.

createLP([F | R]) :-
  retract(temp(F)), !, createLP(R).
createLP([]).

my_findall(P, G, LP) :- retractall(temp(_)), forall(G, assert(temp(P))), createLP(LP).

