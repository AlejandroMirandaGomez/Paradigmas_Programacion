## 2. Ejercicio de diagnóstico

**a. ¿Qué problema resuelve el patrón de diseño Decorator? Dé un ejemplo (que no sea CSS).**

Resuelve el problema de poder tener un objeto base y agregarle atributos/comportamiento extra dependiendo de cuándo se necesiten, pero al final serán únicamente las clases que se necesitan y ya. Sustituye el problema de la herencia, en la que por cada combinación de parámetros se necesita una clase extra; en cambio, con Decorator se pueden hacer combinaciones de muchísimos parámetros sin necesitar una nueva clase por cada combinación.

**b. ¿Qué opciones de implementación para Decorator ofrece Java?**

La idea común de todas es la misma: envolver un objeto en otro con la misma interfaz que le agrega algo. Lo que cambia es cómo se crea esa envoltura. Java ofrece 3 opciones:

1. **Decorator clásico (GoF):** se escribe a mano una clase que implementa la misma interfaz y guarda adentro al objeto original, delegando y agregándole comportamiento. Los decoradores se pueden apilar sin crear una clase por combinación. Es el estilo de `java.io` (`BufferedReader`, etc.). Ejemplo completo runnable en `CafeDecoratorClasico.java`.

2. **Dynamic Proxy (`java.lang.reflect.Proxy` + `InvocationHandler`):** no se escribe la clase envoltura; Java la fabrica en tiempo de ejecución y toda llamada pasa por el método `invoke`, donde uno decide qué decorar. Un solo handler cubre todos los métodos. Limitación: solo funciona sobre interfaces. Ejemplo completo runnable en `CafeProxy.java`.

3. **Librerías / AOP (Spring, ByteBuddy, CGLIB):** igual que el proxy dinámico, pero lo teje una librería y funciona también sobre clases sin interfaz, normalmente declarado con anotaciones (ej. `@Transactional` en Spring). Es la versión "industrial"; requiere una dependencia externa.

Resumen: 1 = envoltura a mano · 2 = envoltura generada por Java (solo interfaces) · 3 = envoltura generada por una librería (interfaces o clases, por anotaciones).

**c. Desde una consola, compile y ejecute este código generado por Gemini. Explique cómo funciona.**

Pasos para ejecutar (el archivo `decorator.java` es un compact source file de Java 25, no hace falta compilar aparte):

```
cd D:\UNA\Paradigmas\Autoestudio\01-21-07
java decorator.java
```

Salida real: `>>>HOLA, CARLOS` (el comentario del código dice "HOLA, CARLOS", pero la salida real lleva `>>>` adelante porque el decorador lo antepone).

Cómo funciona:
1. Se crea el objeto real `ServicioImpl`, cuyo método `obtenerSaludo` devuelve `"Hola, Carlos"` y está marcado con la anotación `@Mayusculas`.
2. `decorar(...)` envuelve ese objeto en un Dynamic Proxy: un objeto que finge ser un `Servicio` y donde cada llamada pasa por el método `invoke` del `InvocationHandler`.
3. En `invoke`: primero ejecuta el método real (`"Hola, Carlos"`); luego busca ese método en la clase real y pregunta si tiene la anotación `@Mayusculas`.
4. Como la tiene y el resultado es texto, devuelve `">>>"` + el texto en mayúsculas → `>>>HOLA, CARLOS`. Los métodos sin la anotación pasarían intactos.

**d. El ejemplo usa otro patrón de diseño. Descúbralo y explíquelo.**

Es el patrón **Proxy**. El ejemplo usa `Proxy.newProxyInstance(...)` junto con un `InvocationHandler` (`DecoradorAnotaciones`), que es la implementación literal del patrón Proxy en Java: un objeto sustituto se pone delante del objeto real e intercepta todas las llamadas (en el método `invoke`). El cliente cree que habla con `Servicio`, pero en realidad habla con el proxy.

Proxy y Decorator son estructuralmente casi idénticos (ambos envuelven un objeto con la misma interfaz); la diferencia es la intención: Decorator añade/mejora comportamiento, Proxy controla el acceso a las llamadas. Este código usa la maquinaria de Proxy para lograr el fin de un Decorator.

## 3. Reto de FP en JS

**a. Escriba `countFemaleAdmins(users)` que cuente cuántas female menores de edad hay en la lista `users` que tienen rol administradora (`admin`).**

Corrección de la versión recursiva (arreglando: `const f = (x) => ...` en vez de `const f(x) => ...`, usar el resto de la lista con `slice(1)` en vez de `shift()`, y mover el `+1` al resultado de la recursión):

```javascript
const countFemaleAdmins = (users) => {
    if (!users.length) return 0;
    const first = users[0];
    const rest = users.slice(1);
    const match = first.gender === "female" && first.age < 18 && first.role === "admin";
    return (match ? 1 : 0) + countFemaleAdmins(rest);
};
```

Mejor manera (estilo funcional, apoyándose en `filter`):

```javascript
const countFemaleAdmins = (users) =>
    users.filter(u => u.gender === "female" && u.age < 18 && u.role === "admin").length;
```

**b. Generalice a `select(users, where, aggregate)` que seleccione de users aquellos usuarios que cumplen con un criteria dada y de esos les calcule aggregate.**

`select` filtra por `where` (el criteria) y aplica `aggregate` a la sublista resultante:

```javascript
const select = (users, where, aggregate) => aggregate(users.filter(where));
```

Uso (incluido `countFemaleAdmins` como caso particular de `select`):

```javascript
const countFemaleAdmins = (users) =>
    select(
        users,
        u => u.gender === "female" && u.age < 18 && u.role === "admin",  // where (criteria)
        lista => lista.length                                            // aggregate (contar)
    );

// otros ejemplos que salen gratis con la misma select:
select(users, u => u.role === "guest", lista => lista.length);           // cuántos guests
select(users, u => u.gender === "male",                                  // edad promedio de hombres
       lista => lista.reduce((acc, u) => acc + u.age, 0) / lista.length);
```
