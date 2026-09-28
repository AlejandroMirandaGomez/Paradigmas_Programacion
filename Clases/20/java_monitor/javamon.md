### Comando para `nodemon` Watching un .java (`Work.java`)

#### Opción Directa (cambie Main por el nombre de su archivo de trabjo)
```bash
nodemon --ext java --watch *.java --exec "java Work.java"
```

### Opción Indirecta Equivalente
* Crear `nodemon.json` en carpeta de trabajo
```json
{
 "watch":["*.java"],
 "ext": "java",
 "execMap": {
   "java" : java
 }
}
```
* Arrancar en consola
```bash
nodemon Work.java
```