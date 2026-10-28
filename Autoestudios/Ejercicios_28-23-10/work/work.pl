/*
0. Como parte del de `P2`, y según se indicó en clase, prepare y modele un grafo en`Prolog` que le sirva en su momento para hacer queries desde el `repl` contra el mismo como si hubiese sido creado desde el `repl` del `Cyphaìl`. Como se indicó, al inicio nos vamos a concentrar en queries por encima de "updates" por razones de tiempo. Su grafo servirá como mecanismo de prueba. Considérelo como parte de su `P2`.
*/

graph(ingenieria).

node(ingenieria, alejandro).
node(ingenieria, andrey).
node(ingenieria, sebastian).
node(ingenieria, wilsinky).

node(ingenieria, paradigmas).
node(ingenieria, discretas).
node(ingenieria, bases_datos).
node(ingenieria, programacion).

node(ingenieria, microsoft).
node(ingenieria, hp).
node(ingenieria, intel).
node(ingenieria, universidad_nacional).
node(ingenieria, acme_tech).

node_label(ingenieria, alejandro, 'Person').
node_label(ingenieria, andrey, 'Person').
node_label(ingenieria, sebastian, 'Person').
node_label(ingenieria, wilsinky, 'Person').

node_label(ingenieria, alejandro, 'Male').
node_label(ingenieria, andrey, 'Male').
node_label(ingenieria, sebastian, 'Male').
node_label(ingenieria, wilsinky, 'Male').

node_label(ingenieria, paradigmas, 'Avanzada').
node_label(ingenieria, discretas, 'Intermedia').
node_label(ingenieria, bases_datos, 'Intermedia').
node_label(ingenieria, programacion, 'Principiante').

node_label(ingenieria, microsoft, 'Company').
node_label(ingenieria, hp, 'Company').
node_label(ingenieria, intel, 'Company').
node_label(ingenieria, universidad_nacional, 'Company').
node_label(ingenieria, acme_tech, 'Company').



	

node_prop(ingenieria, alejandro, name, 'Alejandro').
node_prop(ingenieria, andrey, name, 'Andrey').
node_prop(ingenieria, sebastian, name, 'Sebastian').
node_prop(ingenieria, wilsinky, name, 'Wilson').

node_prop(ingenieria, paradigmas, profesor, 'Carlos Loria').
node_prop(ingenieria, paradigmas, dificultad, alta).
node_prop(ingenieria, paradigmas, discretas, 'Carlos Loria').
node_prop(ingenieria, paradigmas, bases_datos, 'Johnny').
node_prop(ingenieria, paradigmas, programacion, 'Oscar Benavides').

node_prop(ingenieria, microsoft, name, 'Microsoft inc').
node_prop(ingenieria, hp, name, 'Hewlett y Packard (HP)').
node_prop(ingenieria, intel, name, 'Intel inc').
node_prop(ingenieria, universidad_nacional, name, 'Universidad Nacional de Costa Rica').
node_prop(ingenieria, acme_tech, name, 'ACMETech').

edge(ingenieria, e1, 'WORKS_AT', alejandro, hp).
edge(ingenieria, e2, 'WORKS_AT', andrey, microsoft).
edge(ingenieria, e3, 'WORKS_AT', sebastian, acme_tech).

edge_prop(ingenieria, e1, salary, 5000).
edge_prop(ingenieria, e2, salary, 6000).
edge_prop(ingenieria, e3, salary, 7000).

edge_prop(ingenieria, e1, since, 2021).
edge_prop(ingenieria, e2, since, 2021).
edge_prop(ingenieria, e3, since, 2022).

edge_prop(ingenieria, e1, role, 'Developer Backend').
edge_prop(ingenieria, e2, role, 'Developer in Prolog').
edge_prop(ingenieria, e3, role, 'DBA').

/*
1. Explique qué problema plantea `null` en el engine de `Cyphail` en Prolog (lógica tri-valuada). Dé ejemplos.

Prolog distingue entre éxito y fallo de una consulta, mientras que las expresiones de Cyphail necesitan distinguir true, false y null. Una propiedad ausente produce null: si p no tiene edad, p.edad > 18 produce null, no false. Por eso NOT (p.edad > 18) también produce null. La comparación null = null produce null y no true; true AND null produce null, mientras que false AND null produce false. Un WHERE conserva solo las filas cuyo resultado sea true. El engine debe devolver y propagar esos tres valores como datos en lugar de representar null mediante el fallo de Prolog.
*/

/*
2. Escriba `node_satisfies_props(+G, +N, +Props)` que determina si unos `Props` del nodo `N` dados (dado como una lista de ASTs de la forma `Key:Value`) son compatibles con los properties de `N` en el grafo `G`. **Sugerencia**: Hay dos opciones: a) usando `maplist` o b) convirtiendo `Props` en un diccionario (ver método de Prolog `dict_pairs(?Dict, ?Tag, ?Pairs)` ). Evalúe ambas.

La versión con maplist consulta cada propiedad directamente. La versión con diccionarios construye un diccionario con las propiedades pedidas y otro con las del nodo; luego comprueba que el primero sea un subconjunto del segundo. La primera es más simple para una sola comprobación. La segunda facilita reutilizar las propiedades del nodo en varias comprobaciones y requiere claves únicas.
*/

node_satisfies_props(G, N, Props) :-
    node(G, N),
    maplist([Key:Value] >> node_prop(G, N, Key, Value), Props).

node_satisfies_labels(G, N, Labels) :-
    node(G, N),
    maplist([Label] >> node_label(G, N, Label), Labels).

/*
3. Analice el caso de patrón de arco, sobre cuáles `AST`s se ocuparían. Por ejemplo, considere este ejemplo:

MATCH (p:Person)-[r:WORKS_AT]->
      (c:Company {name: "ACMETech"})
WHERE r.salary > 4000 AND r.since > 2020
RETURN p.name, r.role, r.salary
*/

ast_ejercicio_3(query(
    match([
        patt(id(p), labs([id('Person')]), props([])),
        relation(id(r), id('WORKS_AT'), id(p), id(c), right),
        patt(id(c), labs([id('Company')]),
             props([id(name):str('ACMETech')]))
    ]),
    where(and(
        greater_than(prop(id(r), id(salary)), number(4000)),
        greater_than(prop(id(r), id(since)), number(2020))
    )),
    return([
        prop(id(p), id(name)),
        prop(id(r), id(role)),
        prop(id(r), id(salary))
    ])
)).

% Una version que ejecuta ese AST en prolog:

match1(Name, Role, Salary) :-
    node(G, P),
    node_satisfies_labels(G, P, ['Person']),
    node(G, C),
    node_satisfies_labels(G, C, ['Company']),
    node_satisfies_props(G, C, [name:'ACMETech']),
    edge(G, E, 'WORKS_AT', P, C),
    edge_prop(G, E, salary, Salary),
    Salary > 4000,
    edge_prop(G, E, since, Since),
    Since > 2020,
    node_prop(G, P, name, Name),
    edge_prop(G, E, role, Role).

test1 :-
    match1(Name, Role, Salary),
    writeln((Name, Role, Salary)).

test2 :-
    ast_ejercicio_3(AST),
    writeln(AST).
		
% Una versión en nuesto engine:

cy_exec_query(
    
    ( cy_edge(__R, __P, __C),
      cy_edge_label(__R, 'WORKS_AT'),
      cy_node_label(__P, 'Person'),
      cy_node_label(__C, 'Company'),
      cy_node_prop(__C, 'name', 'ACMETech'),
      cy_edge_prop(__R, 'salary', __Rsalary),
      cy_edge_prop(__R, 'since', __Rsince),
      ( cy_greater_than(_Rsalary, 4000), cy_greater_than(_Rsince, 2020) ),
      cy_node_prop(__P, 'name', __Pname),
      cy_edge_prop(__R, 'role', __Rrole)
    ),
		['p.name', 'r.role', 'r.salary'],
    [__Pname, __Rrole, __Rsalary],
    Rows)

/*
4. Analice este ejemplo, en el mismo espíritu del ejercicio previo.

MATCH (p:Person)-[:WORKS_AT]->
      (c:Company {name: "ACMETech"})
WHERE NOT (p)-[:MANAGES]->(:Person)
RETURN p.name
*/

ast_ejercicio_4(query(
    match([
        patt(id(p), labs([id('Person')]), props([])),
        relation(anonymous_relation(1), id('WORKS_AT'),
                 id(p), id(c), right),
        patt(id(c), labs([id('Company')]),
             props([id(name):str('ACMETech')]))
    ]),
    where(not(match([
        patt(id(p), labs([]), props([])),
        relation(anonymous_relation(2), id('MANAGES'),
                 id(p), anonymous_node(1), right),
        patt(anonymous_node(1), labs([id('Person')]), props([]))
    ]))),
    return([
        prop(id(p), id(name))
    ])
)).

% Una version que ejecuta ese AST en prolog:

match2(Name) :-
    node(G, P),
    node_satisfies_labels(G, P, ['Person']),
    node(G, C),
    node_satisfies_labels(G, C, ['Company']),
    node_satisfies_props(G, C, [name:'ACMETech']),
    edge(G, _, 'WORKS_AT', P, C),
    \+ (
        edge(G, _, 'MANAGES', P, OtraPersona),
        node_satisfies_labels(G, OtraPersona, ['Person'])
    ),
    node_prop(G, P, name, Name).

test3 :-
    match2(Name),
    writeln(Name).

test4 :-
    ast_ejercicio_4(AST),
    writeln(AST).
