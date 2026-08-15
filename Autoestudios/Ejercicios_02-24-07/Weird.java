void main(){

    IO.println("'Extraño' comportamiento de java");
    
    Integer num = 666;
    Object  obj = num; // Ok! Todo Integer es un Object :-)
    
    Integer[] integersArray = new Integer[1];
    Object[] objectsArray = integersArray; // :-) Ok un array de enteros es un array de enteros
    
    List<Integer> integersList = new ArrayList<>();
    List<Object>  objectsList = integersList;   
    // :-( No ok. ¿Por qué una lista de enteros no es una lista de objetos. ¿Dogma?
    
}