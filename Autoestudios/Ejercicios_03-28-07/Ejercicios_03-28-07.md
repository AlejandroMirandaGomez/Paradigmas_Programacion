___________________________________________________________

UNA 
EIF400-II-2026 Paradigmas de Programación         

**Sesion**: 28/07/2026

**Autor**: CLoria
___________________________________________________________
 
### Los ejercicios son por default para autoestudio no para entregar necesariamente
## Ejercicios
0. ¿Qué clase de meta-objeto modelan las palabras `extends` e `implements` en un modelo computacional en `Java`, es decir, qué tipo meta-objeto del modelo conceptual representan.
1. Considere el código `java` (supuestamente válido en `jdk26` y usable directamente sin pasar por `javac`) mostrado abajo. En los casos donde aplique hacerlo, trate de predecir por Ud. mismo una respuesta **sin ejecutar** el código (y sin usar IA). Luego confirme o refute su hipótesis ejecutando.
    a. ¿Conforman `A-B-C-D` una instancia del "*Problema del Diamante* en el caso de `java`? Justifique muy bien su respuesta. ¿Compilaría ese código?
    b. Usando las meta-nociones Declarativo/Operativo (meta-objetos: verbo, sustantivo, adjetivo, adverbio, declarativo, imperativo) clasifique cada línea de código y dentro de ella modificadores. Por ejemplo, en una cierta línea es `static` declarativo o operacional, verbo, sustantivo, un adjetivo o un adverbio. O ¿qué rol juega `default`?
    c. ¿Hay algún caso de mutabilidad de algún objeto en algún caso? ¿Se aprecia código imperativo en alguna parte?
    
    d . Justifique o refute esta afirmación: *los dos `test_1` y `test_2` darán los exactamente mismos resultados a pesar de no ser idénticos exactamente*.
    e. Ahora descomente la línea marcada con `<---` en cada caso. Prediga y explique lo que sucedería. Confirme o refute.

2. **Reto**: Escriba en `java` estándar un algoritmo `int fact(int n)`que calcule el factorial de `n` sin usar recursión y sin provocar mutación de objetos ni de memoria que almacene datos primitivos. Por ejemplo, `x++` (o similares) está prohibido. Su solución es robusta y efectiva si se usara multi-hilo pero no usa `synchronized` ni monitores, en general. No puede usar `java.util.stream`. Puede usar obviamente programación imperativa.

```java


import static java.lang.Math.PI;

public interface A{
    static double POOR_PI = 3.1416;
    default double get_PI(boolean highQuality){
        return highQuality ? PI : POOR_PI;  
    }
}

public class B implements A{
    public double get_PI(){
        return this.get_PI(false);  
    }
}
public interface C extends A{
    default public double get_PI(){
        return this.get_PI(true);  
    }
}

public interface D extends A{
    final static double POOR_PI = 3.14;
}

public class E extends B implements C, D{
}

void test_1(){
    IO.println("\n*** Test Case 1 ***");
    C obj1 = new E();
    IO.println("obj1.get_PI(): " + obj1.get_PI());
    IO.println("obj1.get_PI(false): " + obj1.get_PI(false));
    A obj2 = obj1;
    IO.println("obj1 == obj2 is " + (obj1 == obj2));
    // IO.println("obj2: " + obj2.get_PI()); // <---
    IO.println("*** End of Case 1 ***");
}

void test_2(){
    IO.println("\n*** Test Case 2 ***");
    var obj1 = new E();
    IO.println("obj1.get_PI(): " + obj1.get_PI());
    IO.println("obj1.get_PI(false): " + obj1.get_PI(false));
    E obj2 = obj1;
    IO.println("obj1 == obj2 is " + (obj1 == obj2));
    //IO.println("obj2: " + obj2.get_PI()); // <---
    IO.println("*** End of Case 2 ***");
}

void main(){
    test_1();
    test_2();
}
```


 









