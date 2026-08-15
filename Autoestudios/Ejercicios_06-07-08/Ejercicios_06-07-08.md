___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 07/08/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente
## Ejercicios

Refiérase al `Work.ts` de la clase hoy:
1. Considere la clase `TSPerson` desarrollada. Suponga que ahora queremos que el `name` sea un objeto inmutable que tiene tres campos (todos `readonly`) de tipo `string` c/u: `first`, `middle` y `last`. Y además un método `fullname(fmt:Format)` que retorna un `string` con el nombre completo, que puede ser en dos formatos: `"FML"` (first middle last) o `"L,FM"` (last comma first middle) En `TS` eso puede hacerse con `type`s o con un `interface` (que no hemos visto aún). Usaremos el primero acá.

a. Usando un `type` y donde Ud. rellena lo que falte en el siguiente modelo para que funcione. Añada los `export` donde sean apropiados. Note que no usamos `class`.

```javascript
type Format = "FML" | "L,FM" // Formatos para Name
 
type Name = { 
   readonly first:string,
   readonly middle:string,
   readonly last:string,
   full(fmt:Format):string   
}

function fullName(fmt:Format):string{
    /* 
       Implemente acá 
       ...
    */
    throw new Error("To do") // Elimine esta línea una vez implementado
}
function createName(first:string, 
                    middle:string, 
                    last:string):Name{
    /* 
       Implemente acá
       ...
    */
    throw new Error("to do") // Elimine esta línea una vez implementado
}
```

b. Actualice `TSPerson` con este nuevo tipo y haga ejemplos de prueba.
 
c. Mueva `TSPerson` de `Work.ts` a un modulo `ESM` `person.ts` que incluye lo anterior junto con el `class` `TSPerson`. Ponga en `Work.ts` los casos de prueba e importe de este nuevo módulo lo necesario para que sus ejemplos funcionen y el typer los acepte (todo en verde).

---
2. Trabajo desde cero. Considere el problema de tener autómatas como el discutido en clase (realidad objetiva es autómatas, subtema de parsing). Reconozca los verbos y sustantivos de interés. Usando lo aprendido en la pregunta anterior haga **un nuevo proyecto** que se adhiera a `FP` y sus principios, y sin usar `class`. Siga las indicaciones a continuación:

En su nuevo proyecto, haga un nuevo `Work.ts` que sirva de cliente de prueba para su modelo y ponga en él solo código que lo prueba. Logre todo funcionando y en verde para el typer. Ordene el proyecto de forma que en una carpeta `src` están los fuentes de su modelo, en el root queda el `Work.ts`. Basado en nuestro `tsconfig` actual adáptelo  para que `tsc` pueda hacer su trabajo. Una forma es añadir (si no lo tiene) el tag `include` al `tsconfig.json` al nivel de `compilerOptions`. Comente la opción`rootdir` si la tiene descomentada. Forma esperada 
```json
{
    "compilerOptions": {
       // File Layout
       // "rootDir": ".",
       "outDir": "./dist",
       ... como antes      
    },
    "include": [
        "Work.ts",  // EL archivo 'main' en la raíz
        "src/**/*", // tsc ve lo que esté en src
    ]
}
```


