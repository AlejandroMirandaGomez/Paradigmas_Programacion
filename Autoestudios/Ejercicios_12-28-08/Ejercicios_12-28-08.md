___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 28/08/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente
## Ejercicios
1. Considere este código en `Java`:
```Java
class A {
   public void foo(){
       IO.println(">>> I am A::foo");
   }
   public void goo(){
       this.foo();
   }
}

class B extends A{
   public void foo(){
       IO.println(">>> I am B::foo");
   }
}
void main(){
   A a = (A)new B();
   a.foo();
   B b = new B();
   b.goo();   
}
```
Usando la noción de `Resolución de binding estático` versus `Resolución Binding dinámico`:
a. Haga una predicción de la salida sin ejecutar el código.
b. Verifique ejecutando el código su predicción (Para ejecutar: salve con algún nombre, digamos `Binding.java` y ejecute como
```bash
java Binding.java
```
c. Dé una conclusión justificada sobre qué tipo de resolución de binding está ocurriendo con `this`. Sea claro y preciso.

2. Añada al modelo (`Number`) hecho en clase un nuevo constructor de parser `Identifier` que genera un parser que tokeniza identificadores simples (empiezan con un alfabético seguido de alfanuméricos. Haga casos de prueba positivos (cumplen) y negativos (no cumplen).
- **Nota**: Por defecto, son sensibles a mayúsculas/minúsculas que es el comportamiento por defecto de la `RegExps`. Es decir, por ejemplo: `xyz` y `xYz` son identificadores distintos.

3. Similar al anterior pero que reconoce palabras reservadas (keywords) de `Cypher`. Por ejemplo, las siguientes son algunas keywords (aún muchas más)

```sql
CREATE DELETE MATCH NULL 
IS SET OPTIONAL
RETURN WITH UNWIND 
WHERE ORDER BY SKIP 
LIMIT REMOVE MERGE 
FOREACH UNION CALL
```
No haga una `RegExp` por cada una. Piense una estrategia más escalable que pueda extenderse la lista sin duplicar.

- **Nota**: Asuma que las keywords son insensibles a mayúsculas/minúsculas. Es decir, por ejemplo, `MATCH`, `match` y `mAtCh` son todas la misma keyword. 
Ejemplos (en el shell de `node`): Note el "flag" `i` al final de `re_i`. (`i` como en `insensitive`).

```javascript
> re_i = /MATCH.*/i
/MATCH.*/i
> re = /MATCH.*/
/MATCH.*/
> s = 'MaTcH'
'MaTcH'
> s.match(re)
null
> s.match(re_i)
[ 'MaTcH', index: 0, input: 'MaTcH', groups: undefined ]
```
