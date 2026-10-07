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

%amigo_transitivo(G, A, AT) :- edge(_, E1, N, M), edge(_, E2, M, N)

loop(G, N) :- edge(G, _, N, N).