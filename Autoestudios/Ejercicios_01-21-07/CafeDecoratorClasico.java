// Opcion 1: Decorator clasico (GoF) - se ejecuta con: java CafeDecoratorClasico.java
// No necesita imports.

// La interfaz comun
interface Cafe {
    String desc();
}

// El objeto real
class CafeSimple implements Cafe {
    public String desc() { return "cafe"; }
}

// Clase decoradora base: implementa Cafe y GUARDA un Cafe adentro
abstract class CafeDecorador implements Cafe {
    protected Cafe base;
    CafeDecorador(Cafe base) { this.base = base; }
}

// Un decorador concreto: delega en base y le agrega algo
class ConLeche extends CafeDecorador {
    ConLeche(Cafe base) { super(base); }
    public String desc() { return base.desc() + " + leche"; }
}

// Otro decorador concreto
class ConAzucar extends CafeDecorador {
    ConAzucar(Cafe base) { super(base); }
    public String desc() { return base.desc() + " + azucar"; }
}

void main() {
    // Se apilan libremente sin crear una clase por combinacion
    Cafe pedido = new ConAzucar(new ConLeche(new CafeSimple()));
    System.out.println(pedido.desc());   // cafe + leche + azucar
}
