class A {
   public void foo(){
       IO.println(">>> I am A::foo");
   }
   public void goo(){
       this.foo();
   }
}

class B extends A{
   public void foo(){
       IO.println(">>> I am B::foo");
   }
}
void main(){
   A a = (A)new B();
   a.foo();
   B b = new B();
   b.goo();
}
