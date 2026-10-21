
len([], 0).
len([_ | R], N) :- len(R, LR), N is LR + 1 .

%len_tail_recursive(+L, M, N) : M counts how many before L

len_tail_recursive(L, N) :- len_tail_recursive(L, 0, N).

len_tail_recursive([], M, M).

len_tail_recursive([_ | R], M, N) :- 
	M1 is M + 1,
	len_tail_recursive(R, M1, N).

% first(+L, -F): F is the first element of non-empty list L.

first([F | _], F).

second([_, S | _], S).

% app(+A, +B, -C) :- C = A + B (+ being concatenations)

app([], B, B).

app([F | R], B, [F | RB]) :- app(R, B, RB).

mem(X, [X | _]).

mem(X, [_ | R]) :- mem(X, R).

print_numns(A, B, N) :- between(A, B, N), writeln(N).

print_numns(N) :- print_numns(0, 10, N).
 
% max_value(+X, -Y, -Z): Z is max(X, Y)

max_value(X, Y, Z) :- 
	X > Y 
	-> Z = X
	; Z = Y.

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
	MATCH (n) Return n;
	
	graph(G), 
	node(G, N)   % Recordar que N representa n
	.
*/

oper(+, add).
oper(*, mult).

my_compiler(K, [push(K)]) :- atomic(K).

my_compiler(X + Y, C) :- 
	my_compiler(X, CX),
	my_compiler(Y, CY),
	append(CX, CY, CXY),
	oper(+, Oper),
	append(CXY, [Oper], C)
.

test_1 :-
	writeln('**** Test_1 my_compiler ****'),
	AST = 2 + 3,
	my_compiler(AST, Code),
	forall(member(Inst, Code), writeln(Inst)),
	nl
.