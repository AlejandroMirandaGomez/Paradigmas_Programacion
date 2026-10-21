hola :- writeln('Hello from work.pl - Ejercicios 24').

graph(amigos).
graph(things).

node(amigos, a).
node(amigos, b).
node(amigos, c).
node(amigos, d).

node(things, a).
node(things, b).

edge(amigos, e1, a, a).
edge(amigos, e7, a, b).
edge(amigos, e2, a, c).
edge(amigos, e3, b, c).
edge(amigos, e4, b, d).
edge(amigos, e8, b, b).
edge(amigos, e5, c, d).
edge(amigos, e6, d, b).


/*
Usando el demo de grafos de work.pl, escriba graphs_common_nodes(+G1, +G2, -CN) que retorne en CN la lista de nodos que son nodos de ambos grafos G1 y G2.
*/

graphs_common_nodes(G1, G2, CN) :- 
	findall(X, (node(G1, X), node(G2, X)), CN).


/*
1. Haga los cambios necesarios al demo `my_compile` para que funcione el siguiente caso de prueba `test_2`. Note que hay un operador unario/binario (`-`), y `seq` para una secuencia de instrucciones (**Nota**: `seq` no tiene código de máquina solo existe en el AST). La asignación (`=`) tiene asociado `stv x` (store value) que *popea* el top de la pila y lo almacena en la memoria asociada a `x`. La inversa es `ldv x` que *pushea* el valor de la memoria asociada a `x`. Asuma que `print` en AST tiene el código `__print` en la supuesta máquina virtual.
*/

% Operadores Binarios
oper(+, add).
oper(*, mult).
oper(-, sub).
oper(/, div).
oper(>, greater).
oper(<, less).
oper(>=, greater_or_equal).
oper(=<, less_or_equal).

% Operadores Unarios
uoper(-, neg).

% Leaf
my_compiler(K, [push(K)]) :- number(K), !.
my_compiler(K, [ldv(K)])  :- atom(K), !.

my_compiler(AST, C) :- %Post-order
   AST =.. [Oper | Args],
   my_compiler(Oper, Args, C), 
	 !
.

my_compiler(seq, [[]], []) :- !
.

my_compiler(seq, [[AST | Rest]], C) :- 
	my_compiler(AST, C_AST),
	my_compiler(seq, [Rest], C_Rest),
	append(C_AST, C_Rest, C)
.

my_compiler(Oper, [X, Y], C) :-
   my_compiler(X, CX),
   my_compiler(Y, CY),
   append(CX, CY, CXY),
   oper(Oper, MachineOper),
   append(CXY, [MachineOper], C)
.

my_compiler(Oper, [X], C) :-
	my_compiler(X, CX),
	uoper(Oper, MachineOper),
	append(CX, [MachineOper], C)
.

my_compiler(print, [AST], C) :- 
	my_compiler(AST, C_AST),
	append(C_AST, ['__print'], C)
.

my_compiler(=, [X, Y], C) :- 
	my_compiler(Y, C_Y),
	append(C_Y, [stv(X)], C)
.


test_1 :-
	writeln('**** Test_1 my_compiler ****'),
	AST = 2 + 3,
	my_compiler(AST, Code),
	forall(member(Inst, Code), writeln(Inst)),
	nl
.

test_2 :-
    writeln('*** Test_2 my_compiler ***'),
    AST = seq([y = 666, 
               x = -y + 3 * 4 / 5 - 6, 
               print(x + y), 
               print(x > y + 1)
              ]),
    my_compiler(AST, Code),
    writeln('Assembler Code:'),
    forall( member(Inst, Code), writeln(Inst) ) , nl
.          