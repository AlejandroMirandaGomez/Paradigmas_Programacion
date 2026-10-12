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

amigo_transitivo(G, X, Z) :- 
	edge(_, E1, X, Y), 
	edge(_, E2, Y, Z)
	.

loop(G, N) :- edge(G, _, N, N).

/*
fact (+N, -F) is det : F is N!
*/

# Es un actioma, o un fact (facto) que si N=0 entonces F es 1
fact(0, 1).

# N > 0 es un guard.
fact(N, F) :- N > 0, 
	N1 is N-1,
	fact(N1, F1),
	F is N * F1
	.
