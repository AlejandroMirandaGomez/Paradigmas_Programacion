hola :- writeln('Hello from work.pl - Ejercicios 24').

/*
0. Describa en cada caso de forma precisa y concisa qué calcula el goal mostrado: a. append([a,b,c,d], X, Y) b. append(X, Y, [a,b,c,d]) c. append(X, [a,b,c,d], Y)

`append(Xs, Ys, Zs)` significa "Zs es la concatenación de Xs con Ys". Con esa definición:

**a. `append([a,b,c,d], X, Y)`**
El primer argumento está totalmente instanciado. Prolog recorre esa lista y arma `Y = [a,b,c,d|X]`, dejando `X` libre como la cola. Es **determinístico**: una sola solución, donde `Y` es `[a,b,c,d]` seguida de lo que sea `X` (que queda sin instanciar).

**b. `append(X, Y, [a,b,c,d])`**
Busca todas las formas de partir la lista `[a,b,c,d]` en un prefijo `X` y un sufijo `Y` tales que `X++Y=[a,b,c,d]`. Es **no determinístico con soluciones finitas** (n+1 para n=4), que por backtracking da:
```
X=[],        Y=[a,b,c,d]
X=[a],       Y=[b,c,d]
X=[a,b],     Y=[c,d]
X=[a,b,c],   Y=[d]
X=[a,b,c,d], Y=[]
```

**c. `append(X, [a,b,c,d], Y)`**
Aquí `X` está completamente libre (no acotado por nada), así que Prolog genera listas `X` de longitud creciente y para cada una `Y = X++[a,b,c,d]`. Es **no determinístico con infinitas soluciones**:
```
X=[],           Y=[a,b,c,d]
X=[_G1],        Y=[_G1,a,b,c,d]
X=[_G1,_G2],    Y=[_G1,_G2,a,b,c,d]
...
```

La diferencia clave entre b y c: en b el tercer argumento (ya ligado) acota el largo de `X` y `Y`, por eso hay un número finito de soluciones; en c no hay nada que acote el largo de `X`, por eso son infinitas.
*/

/*
1. Sea L una lista anidada de números, tal como L=[[[0], [1,2], 3], [[4,[[5]]]], [[]], 6]. Escriba deepflat(L, FL) donde L es anidada y FL es la lista de números de L respetando el orden en L. En el ejemplo, FL=[0,1,2,3,4,5,6].
*/

% deepflat/3: deepflat(+L, +T, -FL)

deepflat(L, FL) :- deepflat(L, [], FL).

deepflat([], T, T).

deepflat([P | Rest], T, FL) :- is_list(P), !,
	deepflat(P, T, FL1), 
	deepflat(Rest, [], FL2),
	append(FL1, FL2, FL).
	

deepflat([P | Rest], T, FL) :- 
	append(T, [P], T1), 
	deepflat(Rest, T1, FL).
	
/*
2. Escriba `palindrome(L)` que determine si la lista `L` es o no un palíndrome. Su solución debe ser tiempo `O(n)` para `n=length(L)`. No use `reverse` de `Prolog.`
*/

% palindrome/1: palindrome(+L)

palindrome(L) :- 
	revertir(L, L).

revertir([], []) :- !.

revertir([Unico], [Unico]) :- !.

revertir([P | Rest], R) :-
	revertir(Rest, R1),
	append(R1, [P], R).
	
/*
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
*/

% btw(+Low, +High, -X)

btw(Low, High, Low) :- 
	Low =< High.

btw(Low, High, X) :-
	Low < High,
	Low1 is Low + 1,
	btw(Low1, High, X).

% solve(+N, -K)
	
solve(N, K) :-
	btw(0, N, I),
	N1 is N - I,
	btw(0, N1, J),
	NK is N - (I + J),
	K = [I, J, NK].

