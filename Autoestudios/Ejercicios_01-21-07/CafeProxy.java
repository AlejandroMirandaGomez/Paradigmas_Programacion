// Ejemplo de Decorator con Dynamic Proxy
// Se ejecuta con:  java CafeProxy.java

import java.lang.reflect.Proxy;   // aclara cual Proxy usamos (hay otro en java.net)

// La interfaz: la "forma" que van a compartir el cafe real y el proxy
interface Cafe {
    String desc();
}

// El objeto real
class CafeSimple implements Cafe {
    public String desc() {
        return "cafe";
    }
}

// El programa
void main() {

    // 1. El cafe real
    Cafe base = new CafeSimple();

    // 2. Fabricamos el proxy: un objeto falso que finge ser un Cafe
    Cafe proxy = (Cafe) Proxy.newProxyInstance(
        Cafe.class.getClassLoader(),      // plomeria: de donde se carga la interfaz
        new Class[]{ Cafe.class },        // que interfaz(es) finge implementar
        (p, metodo, args) -> {            // que hacer en CADA llamada al proxy
            Object r = metodo.invoke(base, args);   // llama al metodo real del cafe real
            return r + " + leche";                  // y le agrega algo
        }
    );

    // 3. Prueba
    System.out.println(base.desc());    // cafe          (sin decorar)
    System.out.println(proxy.desc());   // cafe + leche  (decorado por el proxy)
}
