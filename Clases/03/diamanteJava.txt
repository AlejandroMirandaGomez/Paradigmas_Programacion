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