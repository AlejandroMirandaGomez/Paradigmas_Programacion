___________________________________________________________

UNA
EIF400-II-2026 Paradigmas de Programación

**Sesión**: 24/07/2026

**Autor**: Alejandro Miranda
___________________________________________________________

# Solución de Ejercicios

## Ejercicio 2

Einstein defiende un paradigma determinista (un modelo o visión determinista del mundo) y rechaza el paradigma probabilístico o no determinista.

Esta misma dicotomía aparece en cómo modelamos la computación:

* **Paradigma determinista**: dado el mismo estado y las mismas entradas, el programa siempre produce el mismo resultado y sigue el mismo camino. Es la visión de Einstein. La mayoría de la programación imperativa y funcional pura cae acá.
* **Paradigma no determinista / probabilístico**: el modelo incorpora el azar o múltiples caminos posibles como parte esencial. Algunos ejemplos son los algoritmos probabilísticos (Montecarlo, Las Vegas), la programación probabilística, los autómatas no deterministas y la computación cuántica.

## Ejercicio 3

El **Diamond Problem** (problema del diamante) es un problema clásico de la **herencia múltiple**, es decir, cuando una clase puede heredar de más de una clase a la vez. C++ lo permite, pero Java no.

Se llama "diamante" por la forma que toma el diagrama de herencia:

```
        A
       / \
      B   C
       \ /
        D
```

* `A` es una clase base.
* `B` y `C` heredan de `A`.
* `D` hereda a la vez de `B` y de `C`.

El conflicto es el siguiente: como `B` y `C` heredan cada una su propia copia de `A`, cuando `D` hereda de ambas termina teniendo **dos copias de `A`** dentro de sí (una vía `B` y otra vía `C`). Entonces, si `A` tiene un atributo o método, al accederlo desde `D` el compilador no sabe cuál de las dos copias usar, y se produce una **ambigüedad**.

### Ejemplo en C++

```cpp
#include <iostream>
using namespace std;

class A {
public:
    void saludar() { cout << "Hola desde A" << endl; }
};

class B : public A { };
class C : public A { };

class D : public B, public C { };

int main() {
    D d;
    d.saludar();   // ERROR: ambiguo, ¿la copia de A vía B o vía C?
    return 0;
}
```

Al compilar esto se obtiene un error de ambigüedad (`request for member 'saludar' is ambiguous`), porque `d` contiene dos subobjetos `A`.

### La solución en C++: herencia virtual

C++ resuelve el problema con la palabra clave `virtual` en la herencia. Al declarar `B` y `C` como herederas virtuales de `A`, se garantiza que `D` tenga una sola copia compartida de `A`:

```cpp
class A {
public:
    void saludar() { cout << "Hola desde A" << endl; }
};

class B : virtual public A { };
class C : virtual public A { };

class D : public B, public C { };

int main() {
    D d;
    d.saludar();   // OK: ahora hay una única copia de A
    return 0;
}
```

### El punto de fondo

* El Diamond Problem es la razón principal por la que muchos lenguajes (como Java) prohíben la herencia múltiple de clases y solo permiten heredar de una clase, aunque sí dejan implementar múltiples **interfaces**.
* C++ sí permite herencia múltiple, y por eso tuvo que introducir un mecanismo (la **herencia virtual**) para resolver la ambigüedad que esta genera.
* Es un buen ejemplo de cómo una decisión de diseño de un paradigma (la POO con herencia múltiple) trae consecuencias que otros paradigmas o lenguajes eligen evitar.

## Ejercicio 4

El código se debe guardar en un archivo `Weird.java`.

### 4.a) ¿Por qué no compila?

La línea que impide la compilación es:

```java
List<Object> objectsList = integersList;
```

En Java los genéricos son **invariantes**: `List<Integer>` no es un subtipo de `List<Object>`, aunque `Integer` sí sea subtipo de `Object`. No es un "dogma" arbitrario, es una decisión para preservar la **seguridad de tipos**. Si esa asignación se permitiera, podría pasar esto:

```java
List<Object> objectsList = integersList; // supongamos que compilara
objectsList.add("soy un String");        // válido: a un List<Object> le cabe un String
Integer x = integersList.get(0);         // ¡explota! integersList creía tener solo Integer
```

Se estaría metiendo un `String` en lo que en realidad es una lista de `Integer`, y el error saldría en tiempo de ejecución. Para evitarlo, Java lo rechaza en tiempo de compilación.

Lo curioso es que la línea equivalente con arrays sí compila:

```java
Object[] objectsArray = integersArray; // esto SÍ compila
```

**En resumen:** `Integer[]` sí es un `Object[]`, pero `List<Integer>` no es un `List<Object>`.

Esto pasa porque **los arrays son covariantes y los genéricos son invariantes**:

* **Covariante** significa que se mantiene la relación de tipos: como `Integer` es un tipo de `Object`, un array de `Integer` también cuenta como un array de `Object`. A esa propiedad de "se mantiene la relación" se le llama **covarianza**.
* **Invariante** significa lo contrario: aunque `Integer` sea un tipo de `Object`, una `List<Integer>` no cuenta como una `List<Object>`. Por eso decimos que **los genéricos son invariantes**: ignoran esa relación de tipos.

¿Y por qué esta diferencia? Porque el array revisa el tipo mientras el programa corre, así que puede permitirse la covarianza. El genérico, en cambio, pierde la información del tipo al compilar, así que la única forma de no romper la seguridad es ser invariante (prohibir la conversión desde el inicio).

### 4.b) ¿Por qué al menos no imprime `'Extraño' comportamiento de java`?

Porque Java compila primero todo el archivo a bytecode y solo después lo ejecuta. La compilación es "todo o nada": si una sola línea no compila, no se genera el `.class`, y entonces no se ejecuta absolutamente nada, ni siquiera las líneas anteriores que sí eran válidas (como el `IO.println` del inicio).

El punto no es solo "compilado vs interpretado" como etiqueta, sino que la ejecución nunca arranca porque no hay programa que ejecutar. En un lenguaje interpretado línea por línea (como Python) probablemente sí se vería el mensaje impreso antes de fallar en la línea problemática; en Java no, porque el compilador rechaza la unidad completa antes de correr una sola instrucción.
