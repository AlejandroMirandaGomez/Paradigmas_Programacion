___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 23/10/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente

## Ejercicios
0. Como parte del de `P2`, y según se indicó en clase, prepare y modele un grafo en`Prolog` que le sirva en su momento para hacer queries desde el `repl` contra el mismo como si hubiese sido creado desde el `repl` del `Cyphaìl`. Como se indicó, al inicio nos vamos a concentrar en queries por encima de "updates" por razones de tiempo. Su grafo servirá como mecanismo de prueba. Considérelo como parte de su `P2`.

1. Explique qué problema plantea `null` en el engine de `Cyphail` en Prolog (lógica tri-valuada). Dé ejemplos.

En la siguientes preguntas, considere el objetivo del modelo `generator.pl` de un generador de código para `AST`s de `Cyphail`. Estos ejercicios buscan ir enriqueciendo el "runtime" del engine de forma que simplifique la generación de código desde Java.

2. Escriba `node_satisfies_props(+G, +N, +Props)` que determina si unos `Props` del nodo `N` dados (dado como una lista de ASTs de la forma `Key:Value`) son compatibles con los properties de `N` en el grafo `G`. **Sugerencia**: Hay dos opciones: a) usando `maplist` o b) convirtiendo `Props` en un diccionario (ver método de Prolog `dict_pairs(?Dict, ?Tag, ?Pairs)` ). Evalúe ambas.

3. Analice el caso de patrón de arco, sobre cuáles `AST`s se ocuparían. Por ejemplo, considere este ejemplo:
```sql
MATCH (p:Person)-[r:WORKS_AT]->
      (c:Company {name: "ACMETech"})
WHERE r.salary > 4000 AND r.since > 2020
RETURN p.name, r.role, r.salary
```
4. Analice este ejemplo, en el mismo espíritu del ejercicio previo.
```sql
MATCH (p:Person)-[:WORKS_AT]->
      (c:Company {name: "ACMETech"})
WHERE NOT (p)-[:MANAGES]->(:Person)
RETURN p.name
```
  
*Nota*: Posible quiz de 10 minutos martes 27/10.