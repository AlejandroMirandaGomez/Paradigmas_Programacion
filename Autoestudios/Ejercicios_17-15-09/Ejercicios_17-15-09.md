___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 15/09/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente
## Ejercicios
1. Usando el modelo prototipo de parsers en `Work.java` desarrollado en clase. Añada combinadores (Lexer o Parser según convenga) según se indica.
    a. `Eoi()` que retorna un lexer que detecta fin de input.
    b. `KeyWord` que sirve para tokenizar keywords. Estos pueden ser insensibles a mayúsculas/minúsculas. Piense en los ejemplos en los keywords de `Cyphail`. No haga un lexer para cada keyword pues eso explotaría la cantidad de combinadores.

    c. `Sequence(p1, ..., pn)` que recibe una cantidad variable de parsers `p_1`, ..., p_n y los combina secuencialmente: `p_{i+1}` continúa donde `p_i` terminó si no hay falla en este. Si un `p_i` falla todo el Sequence falla.

    d. `Star(p)` que es como `Sequence(p, p, ... )`  sigue componiendo hasta que falle o se acabe el input.

2. Haga un modelo de `AST` que le permita parsear con el modelo `Work.java` frases como "`( p : Person: Employee:Player)`". Las frases (son patrones de nodo), pueden ser como estos ejemplos: "`(p)`" o "`(_:Any:One)`", simplemente "`()`". Escriba primero una pequeña gramática que describa ese tipo de frase. Luego haga combinadores específicos para ese lenguaje.




