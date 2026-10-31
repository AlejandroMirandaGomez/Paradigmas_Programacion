graph(amigos).
graph(things).

node(amigos, a).
node(amigos, b).
node(amigos, c).
node(amigos, d).

node_lab(amigos, a, 'Person').
node_lab(amigos, a, 'Female').

node_lab(amigos, b, 'Person').
node_lab(amigos, b, 'Male').

node_lab(amigos, c, 'Animal').
node_lab(amigos, c, 'Male').

node_lab(amigos, d, 'Person').
node_lab(amigos, d, 'Female').

node_prop(amigos, a, active, true).
node_prop(amigos, b, active, false).
node_prop(amigos, c, active, false).
node_prop(amigos, d, active, true).

node_prop(amigos, a, role, super).
node_prop(amigos, b, role, user).
node_prop(amigos, c, role, user).
node_prop(amigos, d, role, user).

node_prop(amigos, a, name, 'Ana').
node_prop(amigos, b, name, 'Beto').
node_prop(amigos, c, name, 'Charlie').
node_prop(amigos, d, name, 'Diana').

edge(amigos, e1, a, a).
edge(amigos, e7, a, b).
edge(amigos, e2, a, c).
edge(amigos, e3, b, c).
edge(amigos, e4, b, d).
edge(amigos, e8, b, b).
edge(amigos, e5, c, d).
edge(amigos, e6, d, b).

:- dynamic current_graph/1.

set_current_graph(G) :- 
	(current_graph(_) -> retract(current_graph(_)); true), 
	assert(current_graph(G))
.

get_current_graph(G) :-
	current_graph(G)
.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ENGINE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% read_term_from_codes(`get_node_label(P, 'Person')`, _Goal, [variables(L)]), call(_Goal).

parse_evaluate_from_atom(Source, VN) :-
	atom_codes(Source, Codes),
	read_term_from_codes(Codes, Goal, [variable_names(VN)]), 
	call(Goal)
.

parse_evaluate_from_codes(Codes, VN) :-
	read_term_from_codes(Codes, Goal, [variable_names(VN)]), 
	call(Goal)
.

get_node_label(N, Lab) :-
	get_current_graph(G),
	node_lab(G, N, Lab).

% nombre objeto_accion_things
node_all_labs(G, N, Labs) :-
	findall(Lab, node_lab(G, N, Lab), Labs)
.

node_all_labs(N, Labs) :-
	get_current_graph(G),
	node_all_labs(G, N, Labs)
.

node_satisfies_labs(G, N, Labs) :-
	forall(member(Lab, Labs), node_lab(G, N, Lab))
.

node_all_props(G, N, Props) :-
	findall(Name:Value, node_prop(G, N, Name, Value), Props)
.

node_all_props(N, Props) :-
	get_current_graph(G),
	node_all_props(G, N, Props)
.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%% TESTING %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

/*
Match (p:Person:Male {active:true, role:'user'}),
	  (q:Person:Female {active:false, role:'user'}) 
	Where q.age < p.age
	Return p.name, q.name
*/

/*
Match (p:Person:Male {active:true, role:'user'}),
	  (q:Person:Female {active:false, role:'user'}) 
	Where q.age < p.age
	Return p.name, q.name
*/

% TDD: Test Developer Driver
test_1 :-
	writeln('**** Generator Test 1 Starts ****'),
	
/*
Match (p:Person:Male)
*/
	
	AST = patt(
					id(p), 
					labs([id('Person'), id('Male')])
					),
	
	writeln(AST), nl,
	
	generate(AST, Code),
	% Expected Code = ´node_all_props(P, P_Props), all_in(['Person', 'Male'], P_PLabs)´, ['p' = 'P'],
	
	writeln(Code), nl,
	
	writeln('****  Generator Test 1 Ends  ****')
.

generate(_AST, _Code) :-
	writeln('Not implemented yet!')
.

