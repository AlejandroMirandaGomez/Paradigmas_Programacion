/*
1.1 Compresión por longitud (run-length encoding)

Defina comprime(+L1, -L2) que sustituya cada racha de un mismo elemento
consecutivo en L1 por un término N-X (si N>1) o por el propio X (si N=1).

?- comprime([a,b,b,a,a,a,c,c,b,b,b], L).
L = [a, 2-b, 3-a, 2-c, 3-b]
*/

comprime([], []) :- !.

comprime([F | Rest], L2) :- comprime(Rest, 1-F, [], L2).

comprime([], Rep-Num, Acc, L2) :-
    ( Rep > 1 -> Entry = Rep-Num ; Entry = Num ),
    reverse([Entry | Acc], L2), !.

comprime([F | Rest], Rep-Num, Acc, L2) :-  
	F \= Num, !,
	( Rep > 1
	->	comprime(Rest, 1-F, [Rep-Num | Acc], L2)
	;		comprime(Rest, 1-F, [Num | Acc], L2) )
.

comprime([F | Rest], Rep-Num, Acc, L2) :-  
	F = Num,
	Rep1 is Rep+1,
	comprime(Rest, Rep1-Num, Acc, L2)
.

/*
1.1 Compresión por longitud (run-length encoding) — parte 2

Defina descomprime(+L2, -L1) que revierta la codificación de comprime/2.
Compruebe que descomprime(L2, L1), comprime(L1, L2) es consistente.
Intente una versión que no construya listas intermedias de repetidos
(es decir, que cuente sobre la marcha en una sola pasada).
*/

descomprime([], []).

descomprime([Rep-Num | Rest], L1) :- 
	Rep =:= 1,
	!,
	descomprime(Rest, Result),
	L1 = [Num | Result]
.

descomprime([Rep-Num | Rest], L1) :- 
	Rep > 1,
	!,
	Rep1 is Rep - 1,
	descomprime([Rep1-Num | Rest], Result),
	L1 = [Num | Result]
.

descomprime([F | Rest], L1) :-
	_Rep-_Num \= F, !,
	descomprime(Rest, Result),
	L1 = [F | Result]
.


/*
1.2 Subsecuencia común más larga

Defina lcs_longitud(+L1, +L2, -N) que calcule la longitud de la
subsecuencia común más larga entre dos listas (los elementos comunes no
necesitan ser adyacentes, solo respetar el orden relativo). Por ejemplo

?- lcs_longitud([2,1,4,5,2,3,5,2,4,3], [1,7,5,3,2], N).
N = 4

porque [1,5,3,2] es común a ambas y no hay ninguna más larga. Use corte
para evitar explorar ramas redundantes cuando los elementos coinciden.
*/

lcs_longitud([], _, 0) :- !.
lcs_longitud(_, [], 0) :- !.

lcs_longitud([X|Xs], [X|Ys], N) :- !,
	lcs_longitud(Xs, Ys, N1),
	N is N1 + 1.

lcs_longitud([X|Xs], [Y|Ys], N) :-
	lcs_longitud(Xs, [Y|Ys], N1),
	lcs_longitud([X|Xs], Ys, N2),
	N is max(N1, N2).
