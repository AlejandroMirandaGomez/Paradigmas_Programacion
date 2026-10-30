lcs_longitud(L1, L2, N) :- 
	lcs_longitud(L1, L2, [], 0, N)
.

lcs_longitud([], _, _, Count, Count) :- !.

lcs_longitud([F | Rest], L2, Visited, Count, N) :- (
	memberchk(F, L2),
	Count1 is Count + 1,
	\+ memberchk(F, Visited)
	-> 	lcs_longitud(Rest, L2, [F | Visited], Count1,  N)
	;		lcs_longitud(Rest, L2, Visited, Count, N) 	
).