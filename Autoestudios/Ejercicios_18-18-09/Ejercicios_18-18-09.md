___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 18/09/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente
## Ejercicios
1. En el modelo `Work.java` generalice `Or` a n-parsers. **Nota**: Si `n` es 0 un resultado de falla.
2. Haga los ejercicios de la sesión 15/09.
3. Añada un modelo (inmutable) de `AST` que le permita parsear con el modelo `Work.java` frases como "`( p : Person: Employee:Player:Male)`". Las frases (son patrones de nodo como se explicó en clase), es decir, pueden ser como estos ejemplos: "`(p)`" o "`(_:Any:One)`", simplemente "`()`". Escriba primero una pequeña gramática que describa ese tipo de frase (como la hecha en la pizarra en clase). Luego haga en `Parsers` combinadores generales similares a `Seq`. Luego haga combinadores específicos para ese sub-lenguaje. POnga estos en una clase `MiniCyphailGrammar`. Haga casos de prueba.





