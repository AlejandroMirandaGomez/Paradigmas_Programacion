hola :- writeln('Hello from work.pl - Ejercicios 23').

/*

1. Las listas en Prolog son una clase compounds con una sintaxis especial. Para listas (similar a JS) se usan corchetes separados por comas. Ejemplo [1, 2, [3, 4], 5]. Para efectos de unificación se usa esta notación [F | R] que denota la lista cuyo primer elemento es F y la lista con el resto de elementos es R. Ejemplos:
[] es la lista nula.
[1,2,3] = [F | R] unifican con F=1, R=[2,3]
[1] = [F | R] unifican con F=1, R=[]
[1,2,3] = [F, S | R] unifican con F=1, S=2, R=[3]
Estudie estas clásulas sobre listas y trate de entender los tipos de facts que representan: Por ejemplo, el primero sirve para probar si una lista L está vacía. Por ejemplo is_empty(L) determina si L es una lista vacía.

is_empty([]).
is_unitary([_]). 
is_not_empty([_|_]).
is_simple(L) :- is_empty(L);is_unitary(L).

¿Cómo sería un fact first(F, L) que sea verdadero si F es el primer elemento de una lista L. Note en simple se usa el ; que es un or.

*/

% first(+F, +L): F is the first element in L list

first(F, [F | _]).

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

Refiérase a work.pl y el modelo de grafos. ¿Qué declara la siguiente cláusula?

schleife(G, E) :-
  graph(G),
  edge(G, N, E, N).

*/


% schleife(G, E) G es un grafo, E es un identificador de edge tal que un nodo esta conectado consigo mismo. (lazo o bucle)

schleife(G, E) :- graph(G), edge(G, E, N, N).

/*
Reto. Escriba transitive_amigo(G, A, TA) que sería verdadera si en el grafo G, el nodo A es un amigo transitivo (en un solo paso) del nodo AT. Es decir, si existe un nodo puente P tal que A es amigo de P y este es amigo de TA.
*/

transitive_amigo(G, A, TA) :- edge(G, _, A, P), edge(G, _, P, TA).