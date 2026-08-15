___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 21/07/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente
## Ejercicios
1. Empiece a buscar compañeros de grupo. Recuerde bajar el [template en drive](https://drive.google.com/drive/folders/1SQLjearpz6eiO-BUXyHd1n9Z8Wd1Itng) y seguir estrictamente las indicaciones.

2. Este ejercicio es de diagnóstico: 
   a. ¿Qué problema resuelve el patrón de diseño `Decorator`? Dé un ejemplo (que no sea CSS).
   b. ¿Qué opciones de implementación para `Decorator` ofrece `Java`?
   c. Desde una **consola**, compile y ejecute este código generado por `Gemini`. Explique cómo funciona
   d. El ejemplo usa otro patrón de diseño. Descúbralo y explíquelo.
   
```java

/**
 * About Decorator
 @author Gemini
 @author loriacarlos@gmail.com
*/

import java.lang.reflect.Proxy;

// ==========================================
// 1. LA ANOTACIÓN (El marcador del decorador)
// ==========================================
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@interface Mayusculas {}

// ==========================================
// 2. INTERFAZ Y COMPONENTE BASE
// ==========================================
interface Servicio {
    String obtenerSaludo(String nombre);
}

class ServicioImpl implements Servicio {
    @Override
    @Mayusculas // Decorador aplicado mediante anotación
    public String obtenerSaludo(String nombre) {
        return "Hola, " + nombre;
    }
}

// ==========================================
// 3. EL DECORADOR (Manejador de Proxy)
// ==========================================
static class DecoradorAnotaciones implements InvocationHandler {
    private final Object objetoOriginal;

    public DecoradorAnotaciones(Object objetoOriginal) {
        this.objetoOriginal = objetoOriginal;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // Ejecuta el método original primero
        Object resultado = method.invoke(objetoOriginal, args);

        // Busca si el método real en la clase tiene la anotación
        Method metodoReal = objetoOriginal.getClass().getMethod(method.getName(), method.getParameterTypes());
        
        if (metodoReal.isAnnotationPresent(Mayusculas.class) && resultado instanceof String) {
            // Aplica la lógica de decoración de forma transparente
            return ">>>" + ((String) resultado).toUpperCase();
        }

        return resultado;
    }

    // Método utilitario para envolver el objeto en el Proxy
    @SuppressWarnings("unchecked")
    public static <T> T decorar(T objeto, Class<T> interfaz) {
        return (T) Proxy.newProxyInstance(
                interfaz.getClassLoader(),
                new Class<?>[]{interfaz},
                new DecoradorAnotaciones(objeto)
        );
    }
}

// ==========================================
// 4. EJECUCIÓN
// ==========================================

public void main(String[] args){

    // Objeto normal sin decorar
    Servicio servicioNormal = new ServicioImpl();
    
    // Objeto envuelto por nuestro decorador de anotaciones
    Servicio servicioDecorado = DecoradorAnotaciones.decorar(servicioNormal, Servicio.class);

    // Prueba del resultado
    System.out.println(servicioDecorado.obtenerSaludo("Carlos")); 
    // Salida Esperada: HOLA, CARLOS
    
}
```   

3. Este tipo de ejercicio es una reto simple de `FP` para los que no conocen mucho del paradigma y repaso para los que sí.
Suponga se tiene una lista de objetos usuarios `users` en `JS` de la forma 

```javascript
{id:1, 
 name:"Perez, Juan", age:22, 
 gender: "male", 
 role:"admin"}
``` 
donde `role` puede ser los strings  `"admin"`, `"user"`, `"guest"` y `gender` `"male"` o `"female"`, también strings..
a) Escriba `countAdultFemaleAdmins(users)` que cuente cuántas `female` menores de edad hay en la lista `users` que tienen rol administradora (`admin`).
b) Generalice a `select(users, where, aggregate)` que seleccione de users aquellos usuarios que cumplen con un `criteria` dada y de esos les calcule `aggregate`. 



 









