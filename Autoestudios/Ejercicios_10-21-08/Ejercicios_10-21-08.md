___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 21/08/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente
## Ejercicios
* En cada caso confirme con ejemplos (test cases) que las respuestas funcionan
* Escriba funciones que resuelvan lo pedido y que cumplen principios `Knuth` y `DRY`. **Nota**: Si usa una IA es probable que esta no sepa el principio `Knuth` por ese nombre; en tal caso explíquele qué significa.
* Logre que sus soluciones pasen el typer (TS).

### Básicos (Warming-up) No deberían ningún problema.
0. Dado un array no vacío de números obtener el máximo, el mínimo y el promedio. Si se le manda un array vacío levanta un `Error`. Logre que no sea `O(3n)`, solo `O(n)`.
1. Dado un array de personas cada una de la forma `{ id?: number, name: string }`, extraer en un array los nombres de las personas pero solo si tienen `id` definido. Note el signo de pregunta en el tipo: quiere decir que el atributo es opcional.
2. Filtrar por propiedad: Dado un array de objetos de tipo `{ product: string, available: boolean }` y un array de productos (`string[]`), obtener los productos del array que están disponibles.
3. Contar elementos con condición: Dado un array de strings con colores `['red', 'blue', 'red', 'green', 'red']`, crear un objeto de conteo que indique cuántas veces se repite cada color (`{ red: 3, blue: 1, green: 1 }`).
4. Validar permisos de usuario: Dado un array de objetos de usuario y de roles `{ user:string, roles: string[] }`, verificar si al menos un usuario tiene el rol `'admin'` en su array de roles.
5. Validación completa de un formulario: Dado un array de objetos de campos de texto como `{ value: string }`, comprobar si todos los campos tienen un valor cuya longitud está entre un mínimo y un máximo inclusive.

### Nivel Mediano
0. Simulación de `map` con `reduce`: Demuestre que el combinador `map` de array en `JS` se puede simular con un `reduce`, es decir,  escriba `<A, B>map(a:A[], f:(x:A) => B):B[]` una función (solo FP) que cumple que  para todos `a` y `f` que satisfagan los tipos `map(a, f) == a.map(f)`. Por supuesto que sin usar `Array::map`,
1. Agrupación de datos: Dado un array de estudiantes con estructura por estudiante como `{ name: string, courses: Subject[] }`, agruparlos en un `Map` donde las llaves sean los nombres de los cursos y los valores sean arrays con los nombres de los estudiantes que  llevan el curso según el array. Asuma 

```javascript
type Subject =    "Basic Math" 
                | "Spanish" 
                | "Programming"`
```
Añada un par más. Puede mutar el `Map`.

2. Búsqueda relacional: Dado un array de pedidos
 ```javascript 
 { order_id: string, 
   items: { product_id: string, 
            quantity: number }[] }
 ```
 verificar si al menos un pedido en el array contiene un item con `pred(quantity)` siendo `true`, donde `pred` es un predicado dado, el que si no se proporciona se asume que verifica cantidad distinta de zero.

### Recursión
1. Escriba en forma recursiva `quickSort(a:number[]):number[]` que retorne una copia de `a` ordenada (de menor a mayor). No use `Array::sort`.
2. Generalice lo anterior a `quickSort<T>(a:T[], comp:(x:T, y:T) => number):T[]`. Donde se cumple para la lambda `comp` que
a. `comp(x, y) < 0` si `x` "*va primero que*" `y`.  
b. `comp(x, y) == 0` si `x` "*equivale a*" `y`
c. `comp(x, y) > 0` si `x` "*va después que*" `y`

3. **[Reto]**: Escribe una función `flatten` recursiva así: recibe una lista de listas de cualquier nivel de anidamiento y devuelve la lista de los objetos que no son listas. Ejemplo:

```javascript
// Ejemplo
flatten( [ 0, [[[1]]], 
           [2, [3], [4,[5]]], 
           [], [[6]], 
           [[], 7] 
         ] )
// Retorna [0, 1, 2, 3, 4, 5, 6, 7]
```

##### Notas: 
* Su respuesta no puede usar `Array::flat(depth:number)`. La idea es simularlo.
* Para tipificación use:
```javascript
type NArray<T> = Array<T | NArray<T>>

function flatten<T>(arr: NArray<T>): T[] {
  throw new Error("TO DO!") // Reemplace por su solución
}
```
2. Variante del anterior ahora definida como
```javascript
function flatten<T>(a: NArray<T>, 
                    max_depth: number){
 //...
}
``` 
que recibe además un `max_depth` y solo retorna aquellos que ocurren en `a` a lo más en profundidad `max_depth` (inclusive). 

**Definición**. Una ocurrencia de objeto `x` en un `NArray` es de profundidad `k` si para llegar a `x` hay que "contar" `k` corchetes abiertos(`[`) de izquierda a derecha. 

Por ejemplo, en el caso de arriba, el 0 está en profundidad 1. El 1 en el array anterior está en profundidad 4.   


