hola :- writeln('Hello from work.pl - Ejercicios 24').

/*
2. Escriba fibo(+N, -F) que calcule el N-ésimo número de fibonacci en F, y que sea recursiva de cola (tail-recursive).
*/

% Version (stack-recursive)
% fibo(N, F): F es el N-esimo número de fibonacci.

fibo(0, 0) :- !.
fibo(1, 1) :- !.

fibo(N, F) :- N > 1,
	N1 is N - 1,
	N2 is N - 2,
	fibo(N1, F1),
	fibo(N2, F2),
	F is F1 + F2.

% Version (tail-recursive)
% fibo_tail(+N, +Penultimo, +Ultimo, -F): Penultimo es el penultimo numero recorrido hasta ese momento de fibonnaci, Ultimo es el Ultimo numero recorrido hasta ese momento de fibonnaci, F es el N-esimo número de fibonacci.

fibo_tail(N, F) :- fibo_tail(N, 0, 1, F).

fibo_tail(0, Penultimo, _, Penultimo) :- !.

fibo_tail(N, Penultimo, Ultimo, F) :-
	Actual is Penultimo + Ultimo,
	N1 is N-1,
	fibo_tail(N1, Ultimo, Actual, F).
	
/*
3. Considere este spec:

 distance(+P, +LP, -NP) : para cualquier persona
 P de la forma person(Name, Age) y 
 LP una lista de personas, con esa misma forma,
 NP (Nearest Persons) es la lista de personas 
 Q en `LP` más cercanas en valor absoluto a `P`
 por edad. 
 Si `LP` es vacía `NP` es vacía.
 
*/

dist_min(Age, [person(_, Age2)], Dist) :-
  Dist is abs(Age - Age2).

dist_min(Age, [person(_, Age2) | Rest], DM) :-
	dist_min(Age, Rest, DMRest),
	Dist is abs(Age - Age2),
	Dist =< DMRest,
	DM = Dist.

dist_min(Age, [person(_, Age2) | Rest], DM) :-
	dist_min(Age, Rest, DMRest),
	Dist is abs(Age - Age2),
	Dist > DMRest,
	DM = DMRest.

distance(_, [], []).

distance(person(_, Age), LP, NP) :-
	LP \= [],
	dist_min(Age, LP, DM),
	filter_nearest(DM, Age, LP, NP).

filter_nearest(_, _, [], []).

filter_nearest(DM, Age, [P2 | Rest], NP) :- 
	P2 = person(_, Age2),
	Dist is abs(Age - Age2),
	filter_nearest(DM, Age, Rest, Nearest),
	Dist =:= DM,
	NP = [P2 | Nearest].

filter_nearest(DM, Age, [P2 | Rest], NP) :- 
	P2 = person(_, Age2),
	Dist is abs(Age - Age2),
	filter_nearest(DM, Age, Rest, Nearest),
	Dist =\= DM,
	NP = Nearest.


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

