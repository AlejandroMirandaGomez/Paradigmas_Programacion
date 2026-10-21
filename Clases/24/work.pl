hola :- writeln('Hello from work.pl').

graph(amigos).
graph(things).

node(amigos, a).
node(amigos, b).
node(amigos, c).
node(amigos, d).

edge(amigos, e1, a, a).
edge(amigos, e7, a, b).
edge(amigos, e2, a, c).
edge(amigos, e3, b, c).
edge(amigos, e4, b, d).
edge(amigos, e8, b, b).
edge(amigos, e5, c, d).
edge(amigos, e6, d, b).

/*
amigo_transitivo(G, X, Z) :- 
	edge(_, E1, X, Y), 
	edge(_, E2, Y, Z)
	.
*/

loop(G, N) :- edge(G, _, N, N).

/*
fact (+N, -F) is det : F is N!

fact(0, 1).

fact(N, F) :- N > 0, 
	N1 is N-1,
	fact(N1, F1),
	F is N * F1
	.

*/

% fact(N, PF, F): PF is (N0)*(N0-1)*...(N-1)

/*

fact(N, F) :- fact(N, 1, F).

fact(0, PF, PF).

fact(N, PF, F) :- N > 0, 
	N1 is N-1,
	PF1 is N * PF,
	fact(N, PF1, F)
	.

*/

first(F, L) :- L = [F | R].

first(F, [F | R]).

% Ejemplo una persona P ama a una cosa X si es barata

loves(P, X) :- person(P), cheap(X).

loves(_, X) :- fun(X).

person(juan).
person(ana).
cheap(mcdonalds).
cheap(tacobell).

fun(fifaps).
fun(chess).