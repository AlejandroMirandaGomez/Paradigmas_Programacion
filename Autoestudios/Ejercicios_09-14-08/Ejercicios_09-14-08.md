___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 18/08/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente
## Ejercicios
Todo código en `FP`

1. Implemente `arraysToMap(a, b)` según se indica en el SPEC del comentario abajo:
```javascript
function arraysToMap(a, b){
  /** SPEC
    * Recibe dos arrays a y b 
    del mismo largo n con 
    a=[a_1, ...,a_n] y 
    b=[b_1,...,b_n]
    * Retorna un Map tal que 
    a_i es llave del valor b_i 
    para cada i \in {1,..., n}    
  */
  throw new Error("To do!") 
  // Cambie el throw por su solución.
}
```
Por ejemplo:
```javascript
const vowels = [..."aeiou"] 
const range = [..."12345"].map(parseInt)
const vowelsRanges = arraysToMap(vowels, range) 
console.log(vowelsRanges)
```
Salida esperada de ese código:
```javascript
Map(5) { 'a' => 1, 'e' => 2, 
         'i' => 3, 'o' => 4, 
         'u' => 5 }
```

2. Considere el objeto `dfa_0` que modela el DFA de prueba hecho en clase (archivo `dfa.ts` de cada horario).
    a. Escriba una función `dfaStatePairs(dfa, state)` que retorne un array `[ [w_1, t_1], ...,[w_n, t_n] ]` tal que `[state, w_i, t_i]` es un `move` en `dfa.moves` para cada `i`. Note que `dfaStatePairs` retorna **todas** las parejas (*pairs*) `[w, t]` tales que si el dfa está en el estado `state` y está viendo el símbolo `w` en el input, se mueve al estado `t`.

    b. Un `dfa` sería (erróneamente) `no determinista` si hubiese al menos un estado `s` en él y al menos dos símbolos `w_1` y `w_2` distintos en su vocabulario tales que `[s, w_1, t_1]` y `[s, w_2, t_2]` son *moves* en el `dfa`. Lo cual sería una forma de validar si la `d` de determinista en el acrónimo `dfa` es correcta o no. Escriba `checkIfDeterministic(dfa)` que retorne `true` si se cumple la negación de `no determinista`. Retorne un booleano según corresponda.
    
3. Una vez que sus respuestas anteriores funciona. Logre que el typer las acepte.
