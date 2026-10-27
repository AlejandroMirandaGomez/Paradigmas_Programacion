
main :- writeln('Hello from work.pl').

:- main.


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


%amigo_transitivo(A, B) :- 
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

/*
   rel(?X, ?Y) : relationship between letters and shapes
*/
rel(b, triangle).
rel(b, square).
rel(d, triangle).
rel(d, square).
rel(d, circle).

/*
  fact(+N, -F) : F is N!
  Stack-Recursive
*/

fact(0, 1).
fact(N, F) :- N > 0, 
              N1 is N - 1, 
			  fact(N1, F1), 
			  F is N * F1 % <-- waits for recursive call
.


/*
  fact(+N, -PF, -F) : 
  Tail-Recursive
*/

fact(N, F) :- fact(N, 1, F).

fact(0, PF, PF).

fact(N, PF, F) :- N > 0, 
              N1 is N - 1, 
			  PF1 is N * PF,
			  fact(N1, PF1, F)			  
.


loves(P, X) :- person(P), cheap(X).
loves(_P, X) :- fun(X).
loves(P, P).

person(juan).
person(ana).

cheap(macdonalds).
cheap(tacobell).
fun(fifaps).
fun(sleep).


% len(+L, -N) : N is the number of elements in list L
len([], 0).
len([_|R], N) :- len(R, RN), N is 1 + RN.

% len_tail_recursive(L, A, N)

len_tail_recursive(L, N) :- len_tail_recursive(L, 0, N).

len_tail_recursive([], M, M).
len_tail_recursive([_ | R], M, N) :-
    M1 is M + 1, %counting First
	len_tail_recursive(R, M1, N)
.

% first(L, F) : F is the first element of L
first([F | _], F).
	
	
second([_, S| _], S).

%También así: second([ _ | [S| _] ], S).


% mem(X, L) : X is a member of list L 

mem(X, [X | _] ).
mem(X, [_ | R] ) :- mem(X, R).

% app(L, M, P) : P is the concat of L with M
% Ejemplo: app([1, 2], [a, b, c], [1,2,a,b,c])

app([], L, L).
app([F | R], M, [F|RM]) :- app(R, M, RM).

print_some_nums(Nums) :-
   forall( member(N, Nums), 
           writeln(N) 
		 ).

max(X, Y, Z) :- X > Y -> Z = X ; Z = Y.


/*

 MATCH (a) RETURN a
 -->
 graph(G),
 findall(A, node(G, A), LA)
*/

oper(+, add).
oper(*, mult).
oper(/, div).
oper(-, sub).

my_compile(C, [push(C)]) :-
   atomic(C), !
.

my_compile(T, C) :-
   T =.. [Oper | Args],
   my_compile(Oper, Args, C)
.

my_compile(Oper, [X, Y], C) :-
   my_compile(X, CX),
   my_compile(Y, CY),
   append(CX, CY, CXY),
   oper(Oper, OperCode),
   append(CXY, [OperCode], C)
.


test_1 :-
   writeln('*** My Compiler ***'),
   T = 2 + 3 * 4/5 - 6,
   my_compile(T, Code),
   forall( member(Inst, Code),  writeln(Inst) ),
   nl
.

test_2 :-
	writeln('*** Assert Working ***'),
	findall(P, person(P), LP),
	format('Before: ~w', [LP]), nl,
	
	forall(member(N, [ana, pedro, juan]), assert( human(N) )),
	
	findall(NP, human(NP), LNP),
	format('After: ~w', [LNP]),
	retractall(human(_))
.

square(X, S) :- S is X * X.

acumular(X, Acc, Nacc) :- Nacc is X + Acc.