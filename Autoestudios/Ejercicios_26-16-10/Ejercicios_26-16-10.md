___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 16/10/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente

## Ejercicios
0. Explique qué hace el predicado `niet/1`. Sea preciso y conciso. 
```prolog
niet(G) :- call(G),!, fail.
niet(_).
```

Usando el demo de grafos de `work.pl`, escriba `graphs_common_nodes(+G1, +G2, -CN)` que retorne en `CN` la lista de nodos que son nodos de ambos grafos `G1` y `G2`.

1. Haga los cambios necesarios al demo `my_compile` para que funcione el siguiente caso de prueba `test_2`. Note que hay un operador unario/binario (`-`), y `seq` para una secuencia de instrucciones (**Nota**: `seq` no tiene código de máquina solo existe en el AST). La asignación (`=`) tiene asociado `stv x` (store value) que *popea* el top de la pila y lo almacena en la memoria asociada a `x`. La inversa es `ldv x` que *pushea* el valor de la memoria asociada a `x`. Asuma que `print` en AST tiene el código `__print` en la supuesta máquina virtual.
```prolog
test_2 :-
    writeln('*** Test_2 my_compile ***'),
    AST = seq([y = 666, 
               x = -y + 3 * 4 / 5 - 6, 
               print(x + y), 
               print(x > y + 1)
              ]),
    my_compile(AST, Code),
    writeln('Assembler Code:')
    forall( member(Inst, Code),
            writeln(Inst) ),
    nl
.          
```






