
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