___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 24/07/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente
## Ejercicios
1. Haga los ejercicios de la sesión previa si no los ha hecho.

2. Se le atribuye a `Einstein` la frase "Dios no juega a los dados" para rechazar un universo probabilístico como el que se deduce de la física cuántica. ¿Qué clase de paradigma estaría usando en este caso? (**IA autorizada**)

3. Lea y busque un ejemplo en `C++` del `Diamond Problem`. Esté en capacidad de explicarlo con propiedad. (**IA autorizada**)

4. Salve el código en un `Weird.java`. 
    a. Trate de compilar el siguiente código y explique por qué no es posible. No traduzca y transcriba el error. Dé una justificación.(**IA no autorizada**)
    b. ¿Por qué al menos no imprime `'Extraño' comportamiento de java`?(**IA no autorizada**)

```java
void main(){

    IO.println("'Extraño' comportamiento de java");
    
    Integer num = 666;
    Object  obj = num; // Ok! Todo Integer es un Object :-)
    
    Integer[] integersArray = new Integer[1];
    Object[] objectsArray = integersArray; // :-) Ok un array de enteros es un array de enteros
    
    List<Integer> integersList = new ArrayList<>();
    List<Object>  objectsList = integersList;   
    // :-( No ok. ¿Por qué una lista de enteros no es una lista de objetos. ¿Dogma?
    
}
```   











