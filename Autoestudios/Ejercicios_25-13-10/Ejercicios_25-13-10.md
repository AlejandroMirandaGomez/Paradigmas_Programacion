___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 13/10/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente

## Ejercicios
0. Describa en cada caso de forma precisa y concisa qué calcula el goal mostrado:
a. `append([a,b,c,d], X, Y)`
b. `append(X, Y, [a,b,c,d])`
c. `append(X, [a,b,c,d], Y)`

1. Sea `L` una `lista anidada` de números, tal como `L=[[[0], [1,2], 3], [[4,[[5]]]], [[]], 6]`. Escriba `deepflat(L, FL)` donde `L` es anidada y `FL` es la lista de números de `L` respetando el orden en `L`. 
En el ejemplo, `FL=[0,1,2,3,4,5,6]`.

2. Escriba `palindrome(L)` que determine si la lista `L` es o no un palíndrome. Su solución debe ser tiempo `O(n)` para `n=length(L)`. No use `reverse` de `Prolog.`

3. Considere este çódigo en `JS` (incluyendo el caso de prueba). Reescriba en `Prolog`. Para simular hileras de interpolación puede usar `format` de Prolog.
```javascript

function* solve(n){
    for(let i = 0; i <= n; i++){
        for(let j = 0; j <= n - i; j++){
            yield [i, j, n - (i + j)]
        }
    }
}
function test_solve(n){
    console.log(`*** Test solve(${n}) ***`);
    for(const [i,j,k] of solve(n)){
        console.log(`${i}+${j}+${k}= ${n}`);
    }
}
test_solve(4) 
          
```






