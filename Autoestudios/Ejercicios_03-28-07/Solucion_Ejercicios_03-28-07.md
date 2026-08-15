___________________________________________________________

UNA
EIF400-II-2026 Paradigmas de Programación

**Sesion**: 28/07/2026

**Autor**: Ale (solución)
___________________________________________________________

## Soluciones

### 0. ¿Qué clase de meta-objeto modelan `extends` e `implements`?

No son un **verbo**, ya que no ejecutan ninguna acción en tiempo de ejecución (no son un método/función que "hace" algo cuando el programa corre).

Son una **declaración estructural** que establece una **relación** entre dos tipos — es decir, corresponden al meta-objeto **relación/asociación** (la tercera categoría del modelo conceptual, junto a objetos=sustantivos y funciones=verbos):

- `extends`: relación de **herencia** (B "es un tipo de" A).
- `implements`: relación de **cumplimiento de contrato** (B "se compromete a comportarse como" A).

Esta relación es de naturaleza **declarativa** (indica *qué* relación existe entre las clases), no operativa.

### 1a. ¿Conforman `A-B-C-D` una instancia del Problema del Diamante? ¿Compilaría?

**Sí, la jerarquía es una instancia del Problema del Diamante** (de hecho, un "triple diamante"):

```
        A
      / | \
     B  C  D
      \ | /
        E
```

`E` llega a `A` por tres caminos distintos: `E→B→A`, `E→C→A` y `E→D→A`. Eso es justamente la definición de herencia en diamante: múltiples caminos de herencia que convergen en un ancestro común. Que `B` sea una clase y `C`/`D` sean interfaces no cambia la forma del grafo de herencia, solo el mecanismo que usa Java para resolverlo.

Además, hay una **colisión real** de miembros dentro de ese diamante: tanto `B` (clase) como `C` (interfaz) definen un método `get_PI()` **sin argumentos** (una sobrecarga distinta al `get_PI(boolean)` declarado en `A`). En un lenguaje como C++ esa situación produciría ambigüedad o exigiría herencia virtual.

**Sí compila**, pero no porque no sea diamante, sino porque Java tiene reglas de desempate específicas para conflictos entre métodos `default`:

1. Un método **concreto heredado de una clase** siempre le gana a un método `default` de una interfaz, sin importar cuántos caminos de herencia existan.
2. Como `B` es una clase y aporta una implementación concreta de `get_PI()`, esa versión gana automáticamente sobre el `default get_PI()` de `C` — sin que `E` necesite sobreescribir nada.

En resumen: sí es diamante, sí hay colisión de miembros, pero Java la resuelve de forma determinística (a diferencia de C++), por lo que el código compila usando la implementación de `B`.
