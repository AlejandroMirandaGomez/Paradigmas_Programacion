
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