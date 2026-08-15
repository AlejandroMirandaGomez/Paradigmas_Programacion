___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 04/08/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente
## Ejercicios
Considere `Work.ts` de la clase hoy:
1. Añada un método `toString(){...}` a `class` `Person` que retorne un string de la forma que para `juan` tendría la hilera `Person[name=Juan, age=20, gender=male]` como su `toString()`.
2. Añada un método `saveToJSON(filename){...}` que salve (serialice) en el archivo `filename` una versión `json` de la persona. Para `juan`, por ejemplo, sería salvar un archivo que contenga
```json
{
  "name":"Juan",
  "age":20,
  "gender":"male"
}
```
3. Suponga que queremos poder comparar de forma que dos personas de clase `Person` sean la misma (same), es decir, que tienen el mismo `name`, `age` y `gender`. Investigue sobre la mejor práctica para implementar esa funcionalidad. **Nota**: Este ejercicio va a significar entender una importante **diferencia semántica** entre `JS` y `Java` sobre igualdad y sameness. Concluya después del ejercicio cuál es esa diferencia.

4. Suponga que se tiene un array `persons` `[p1, p2, ...pm]` no vacío de objetos `Person`. Escriba una función `namesakes(persons)` que retorne un array de arrays de la forma `[s1, s2, ..., sn]` tal que las personas en cada subarray `sk` son tocayas y todos los `sk` son disjuntos entre dos-a-dos. Retorna `[[p1], [p2], ..., [pm]]`  si no hay del todo tocayos en `persons`. ¿Lo puede hacer en tiempo `O(n)`?


