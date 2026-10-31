/*
ws(I, O) :-
	I = [C | Rest_Input], is_ws(C), !, ws(Rest_Input, O)
.

ws(I, O) :- O = I
.
*/

is_ws(C) :- code_type(C, space).
is_digit(C) :- code_type(C, digit).

% [C] at this point in Input we see a C and rest Rest_Input
% {is_ws(C)} outside the syntx: call prolog with is_ws(C)
% ws : call ws(Rest_Input, O)
ws --> [C], {is_ws(C)}, !, ws.

% At this point no more to see: Let O = I.
ws --> [].


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

digits([D | RD]) --> [D], {is_digit(D)}, !, digits(RD).

digits([]) --> [].

int(Num) --> ws, digits(LD), {number_codes(Num, LD)}.