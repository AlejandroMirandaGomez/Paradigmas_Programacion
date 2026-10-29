___________________________________________________________

UNA
EIF400-II-2026 Paradigmas de Programación — Práctica adicional de Prolog

**Fuente**: Clases 23-29 (unificación, listas/compounds, corte, negación, metapredicados,
`assert`/`retract`, grafos para el proyecto Cyphail, DCG), soluciones de los Quiz 5-6-8, y
*Ejercicios de programación declarativa con Prolog* (J. A. Alonso Jiménez, 2006).

**Criterio de selección**: se excluyen a propósito los ejercicios de manipulación básica de
listas (primer elemento, último, penúltimo, resto, concatenar, invertir, pertenencia, etc.) porque
ya los domina. Todo lo de aquí abajo requiere combinar recursión no trivial, corte/negación,
metapredicados de segundo orden, búsqueda con backtracking, DCG o el modelo de grafos que ya usa
en `work.pl`/`generator.pl`.
___________________________________________________________

## Bloque 1. Listas: compresión, subsecuencias y particiones

### 1.1 Compresión por longitud (run-length encoding)
Defina `comprime(+L1, -L2)` que sustituya cada racha de un mismo elemento consecutivo en `L1` por
un término `N-X` (si `N>1`) o por el propio `X` (si `N=1`).
```prolog
?- comprime([a,b,b,a,a,a,c,c,b,b,b], L).
L = [a, 2-b, 3-a, 2-c, 3-b]
```
Luego defina `descomprime(+L2, -L1)` que revierta la codificación. Compruebe que
`descomprime(L2, L1), comprime(L1, L2)` es consistente. Intente una versión que **no** construya
listas intermedias de repetidos (es decir, que cuente sobre la marcha en una sola pasada).

### 1.2 Subsecuencia común más larga
Defina `lcs_longitud(+L1, +L2, -N)` que calcule la longitud de la subsecuencia común más larga
entre dos listas (los elementos comunes no necesitan ser adyacentes, solo respetar el orden
relativo). Por ejemplo
```prolog
?- lcs_longitud([2,1,4,5,2,3,5,2,4,3], [1,7,5,3,2], N).
N = 4
```
porque `[1,5,3,2]` es común a ambas y no hay ninguna más larga. Use corte para evitar explorar
ramas redundantes cuando los elementos coinciden.

### 1.3 Dientes de sierra
Un *diente* es una lista que crece estrictamente hasta una cima y luego decrece estrictamente
(ambos tramos no vacíos). Defina `diente(+L, -Subida, -Cima, -Bajada)`:
```prolog
?- diente([1,2,5,4,3,1], Subida, Cima, Bajada).
Subida = [1,2], Cima = 5, Bajada = [4,3,1]
```
Una *sierra* es la concatenación de dientes que comparten el elemento de empalme (p. ej.
`[1,2,1,3,1]` son los dientes `[1,2,1]` y `[1,3,1]`). Defina
`dientes_de_sierra(+L1, -L2)` que, si `L1` es una sierra, devuelva en `L2` la lista de sus dientes.

### 1.4 Subconjuntos de suma dada (subset-sum)
Defina `subconjunto_suma(+L1, +N, -L2)` que, por backtracking, genere subconjuntos de `L1` cuya
suma sea exactamente `N`.
```prolog
?- subconjunto_suma([10,7,3,4,2,1], 7, L).
L = [7] ;
L = [3, 4] ;
L = [4, 2, 1] ;
No
```
Escriba primero una versión directa y luego una versión con un acumulador de "presupuesto
restante" para que falle antes (pode el árbol de búsqueda en cuanto la suma parcial supera `N`).
Compare con `numlist(1,20,L1), time(findall(S, subconjunto_suma(L1,10,S), _))` cuánto mejora.

---

## Bloque 2. Aritmética con agregación (`findall`/`between`/recursión acotada)

### 2.1 Conjetura de Collatz (3n+1)
Defina `sucesion_collatz(+N, -L)` con la lista `N, f(N), f(f(N)), ..., 1` donde `f(x) = x/2` si `x`
es par y `f(x) = 3x+1` si es impar.
```prolog
?- sucesion_collatz(3, L).
L = [3, 10, 5, 16, 8, 4, 2, 1]
```
Luego defina `menor_con_longitud_mayor_que(+Cota, -M)` que encuentre el menor `M` cuya sucesión de
Collatz tenga más elementos que `Cota`.
```prolog
?- menor_con_longitud_mayor_que(100, M).
M = 27
```

### 2.2 Clasificación de números según sus divisores propios
Un número es *deficiente* si es mayor que la suma de sus divisores propios, *perfecto* si es
igual, y *abundante* si es menor. Defina `divisores_propios/2`, `tipo_numero(+N, -T)` (con
`T` en `{deficiente, perfecto, abundante}`) y `resumen(+N, -Def, -Perf, -Abund)` que cuente, entre
`1` y `N`, cuántos números hay de cada tipo.
```prolog
?- resumen(28, Def, Perf, Abund).
Def = 23, Perf = 1, Abund = 4
```

### 2.3 Números taxicab (generalización del número de Hardy)
Un número es *taxicab de orden 2* si puede escribirse como suma de dos cubos positivos de dos
formas distintas (el caso célebre es 1729 = 1³+12³ = 9³+10³). Defina `es_cubo/1` y
`descompone_en_cubos(+N, -X, -Y)` (con `X =< Y`) usando una cota de búsqueda O(∛N) —no recorra
`1..N` linealmente, calcule antes la cota con `N^(1/3)`. Defina `taxicab(+N)` que se cumpla si `N`
tiene exactamente dos descomposiciones distintas, y `primer_taxicab(-N)` que encuentre el menor.
Verifique que `primer_taxicab(N)` da `N = 1729` en un tiempo razonable (si tarda varios segundos,
revise que esté acotando la búsqueda).

---

## Bloque 3. Grafos y búsqueda (conectan con el modelo de `work.pl`/`generator.pl`)

### 3.1 Autómata finito no determinista con movimientos nulos
Represente un autómata con `final/1`, `trans/3` (etiqueta) y `nulo/2` (transición épsilon), al
estilo del ejemplo visto en clase para el engine de Cyphail. Defina `acepta(+Estado, +Palabra)` y
luego `acepta_con_longitud(+Estado, -Palabra, +N)` que genere, por backtracking, todas las
palabras de longitud exactamente `N` aceptadas desde `Estado`. Mida con `time/1` cuánto más rápido
es acotar la longitud primero con `between/3` + `length/2` que generar y filtrar después.

### 3.2 Clausura transitiva genérica
En la Sesión 23 escribió `transitive_amigo/3` para **un solo paso intermedio**. Generalícelo:
defina `alcanzable(+G, +Rel, +N, -M)` que, dado un grafo `G` (su predicado `edge/4` ya existente en
`work.pl`) y una etiqueta de relación `Rel`, calcule si `M` es alcanzable desde `N` siguiendo **uno
o más** arcos de esa relación (clausura transitiva real, no acotada a un salto). Evite bucles
infinitos cuando el grafo tiene ciclos (lleve una lista de visitados).
```prolog
?- alcanzable(amigos, conoce, a, M).
M = b ;
M = c ;
M = d ;
No
```

### 3.3 Camino del caballo de ajedrez (calienta motores para `cy_path`)
Represente casillas como `[X,Y]` con `X,Y` entre 1 y 8. Defina `salta(+C1, -C2)` con los ocho
movimientos del caballo, y `camino_caballo(+C1, +C2, +N, -Camino)` que encuentre un camino de
exactamente `N` saltos entre dos casillas usando búsqueda en profundidad con poda (no repita
casillas). Luego defina `camino_minimo(+C1, +C2, -Camino)` que encuentre uno de longitud mínima
probando `N = 1, 2, 3, ...` hasta que `camino_caballo/4` tenga éxito. Esto es exactamente el
patrón `strategy(bfs/dfs)` + `bounds(A,B)` que ya implementó en `cy_path/5`, pero en un dominio
más simple para depurar la lógica de búsqueda por separado.

### 3.4 Coloreado de grafos
Represente un grafo como lista de pares `region-vecinos` (igual que `mapa(N, L)` del material de
referencia). Defina `coloracion(+Grafo, +Colores, -Asignacion)` donde `Asignacion` es una lista de
pares `region-color` tal que dos regiones vecinas nunca comparten color. Luego defina
`numero_cromatico(+Grafo, -K)` que encuentre el menor número de colores necesarios probando
`K = 1, 2, 3, ...`. Pruebe con un grafo de al menos 8 nodos (puede adaptar uno de los grafos que ya
tiene en `work.pl` para el proyecto).

### 3.5 El problema del mono y el plátano
Modele el clásico problema de planificación: un mono en una habitación, una silla que puede
empujar, y un plátano colgado del techo que solo puede alcanzar subido a la silla y en el centro
de la habitación. Defina `estado(PosMono, EncimaDe, PosSilla, TienePlatano)`,
`movimiento(+Estado1, -Accion, -Estado2)` con las acciones `pasear/2`, `empujar/2`, `subir` y
`coger`, y `solucion(+EstadoInicial, -Acciones)` que encuentre la secuencia de acciones que
consigue el plátano. Es su primer ejercicio real de planificación tipo STRIPS en Prolog.

---

## Bloque 4. Metaprogramación: reimplementar metapredicados y usar memoria dinámica

### 4.1 `maplist` y `foldl` desde cero
Sin usar los predicados predefinidos, implemente `mi_maplist(:Pred, +L1, -L2)` (aplica `Pred` a
cada elemento) y `mi_foldl(:Pred, +L, +Acc0, -AccFinal)` (acumula con `Pred(Elem, AccIn, AccOut)`).
Pruebe `mi_foldl` para sumar una lista y para calcular el producto, reutilizando el mismo
`mi_foldl` con distintos predicados auxiliares (eso es justamente el punto de recibirlo como
argumento de segundo orden).

### 4.2 Memoria dinámica para acelerar una recursión costosa
Elija una función con recursión doble costosa —por ejemplo el número de particiones de un entero,
o Fibonacci sin acumulador— e impleméntela primero de forma ingenua. Luego cree una versión
`_memo` que use `:- dynamic` + `assertz` para cachear resultados ya calculados (al estilo de
`fatorial_on_memoria` del material de referencia). Mida con `time/1` la diferencia para una
entrada donde la versión ingenua tarde notablemente más de un segundo.

### 4.3 Manejo de errores con `catch`/`throw` en un evaluador de expresiones
Defina `eval_expr(+Expr, +Entorno, -Valor)` que evalúe expresiones aritméticas representadas como
compounds (`num(N)`, `var(X)`, `Izq+Der`, `Izq-Der`, `Izq*Der`, `Izq/Der`), donde `Entorno` es una
lista de pares `Var-Valor`. Debe lanzar con `throw/1` un error propio y descriptivo —no el de
SWI— cuando: (a) una variable no está en `Entorno`, o (b) hay una división entre cero. Defina
además `eval_seguro(+Expr, +Entorno, -Resultado)` que use `catch/3` para capturar esos errores y
devolver `ok(Valor)` o `error(Motivo)` en vez de abortar.

---

## Bloque 5. DCG (conecta con las Sesiones 28-29)

### 5.1 Parser de expresiones aritméticas con precedencia
Escriba una gramática DCG que reconozca expresiones con `+`, `-`, `*`, `/`, paréntesis y números,
respetando la precedencia de operadores (típicamente con no-terminales `expr//1`, `termino//1`,
`factor//1`, cada uno devolviendo el AST construido). Pruebe con
```prolog
?- phrase(expr(AST), `2+3*4`).
AST = 2+3*4   % o la forma de AST que usted elija, p.ej. suma(2, mul(3,4))
```
y verifique que respeta la precedencia (el resultado de evaluar ese AST debe dar 14, no 20).
Añada una regla para el menos unario (`-3+4`).

### 5.2 Mini-gramática de patrones estilo Cypher
Dado que ya está construyendo `generator.pl` para Cyphail, escriba una DCG que reconozca un patrón
de nodo simplificado como `(x:Persona {activo:true})` sobre una lista de códigos o átomos, y lo
traduzca a un término `patt(id(x), labs([id('Persona')]), props([activo:true]))` (o la forma que ya
use en su AST). No tiene que cubrir toda la sintaxis de Cypher: alcance con un nodo con alias
opcional, 0 o más etiquetas y una lista opcional de pares `propiedad:valor`. Esto es justo el paso
previo a que `parse_evaluate` reciba texto en vez de términos Prolog ya armados.

---

## Bloque 6. Retos de combinación (opcionales, mezclan varios bloques)

### 6.1 Subasta de lotes compatibles
Dada una lista de ofertas `oferta(Id, Lote, Precio)` donde `Lote` es una lista de artículos, defina
`ofertas_aceptadas(-Aceptadas)` que escoja el subconjunto de ofertas **sin artículos repetidos
entre sí** que maximice la ganancia total. Combina el subconjunto del ejercicio 1.4 con una
comparación de "no hay otra solución mejor" al estilo `not(( ..., Mejor > Actual ))`.

### 6.2 Agrupación mínima de tareas compatibles
Dada `incompatibles(T1, T2)` (dos tareas que no pueden ir en el mismo grupo porque comparten algún
recurso), defina `agrupacion_minima(+Tareas, -Grupos)` que particione `Tareas` en el menor número
de grupos tal que ningún grupo contenga un par incompatible. Es el mismo problema que el coloreado
de grafos del ejercicio 3.4, visto desde el ángulo de "particionar una lista" en vez de "asignar
colores" — note que ambos terminan siendo el mismo algoritmo.
