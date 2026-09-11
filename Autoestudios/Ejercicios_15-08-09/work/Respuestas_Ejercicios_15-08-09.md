___________________________________________________________

UNA
EIF400-II-2026 Paradigmas de Programación

**Respuestas a los ejercicios 1 y 2**
___________________________________________________________

## Pregunta 1: ¿Por qué `Token<T>` y `Lexema<T>` no son intercambiables?

### El código del enunciado

```java
interface Token<T>{
   TType ttype();
   T value();
}
interface Lexema<T>{
   TType ttype();
   T value();
}

<T> Token<T> foo(Token<T> x){return x;}

void main(){
   IO.println( foo( new Lexema<String>(){ ... } ) );
}
```

`Token<T>` y `Lexema<T>` declaran exactamente los mismos métodos, con las mismas firmas.
Aun así, Java rechaza el programa (podés comprobarlo corriendo
[Ejercicio1.java](work/Ejercicio1.java) con `java ./Ejercicio1.java`):

```
error: method foo in class Ejercicio1 cannot be applied to given types;
  required: Token<T>
  found:    <anonymous Lexema<String>>
  reason: cannot infer type-variable(s) T
    (argument mismatch; <anonymous Lexema<String>> cannot be converted to Token<T>)
```

### La causa: Java compara nombres, no formas

Java usa **tipado nominal**: para que un valor cuente como un `Token<T>`, su clase (o
interfaz) tiene que decir explícitamente `implements Token<T>` (o `extends`, si es una
interfaz). No alcanza con que "tenga los mismos métodos" — el compilador nunca compara
la forma (los métodos) de dos tipos para decidir si son compatibles, solo se fija en
si uno declaró heredar/implementar al otro.

La clase anónima del ejemplo implementa `Lexema<String>`. Como `Lexema` nunca declaró
`extends Token<T>`, para Java son dos tipos totalmente ajenos entre sí, aunque por
dentro tengan idéntica forma. Es como tener dos carnets de identificación con la
misma información pero de instituciones distintas: uno no sirve para lo que pide el
otro, aunque digan lo mismo.

Esto contrasta con el **tipado estructural** (el que usa TypeScript, por ejemplo),
donde dos tipos son compatibles con solo tener la misma forma, sin necesidad de
declarar ningún parentesco. Ver la pregunta 2.

### La corrección

Alcanza con declarar el parentesco que le faltaba:

```java
interface Lexema<T> extends Token<T> {
}
```

Con ese único cambio el programa compila y corre
([Ejercicio1Fixed.java](work/Ejercicio1Fixed.java), verificado con
`java ./Ejercicio1Fixed.java`). La forma no cambió en nada — lo único que cambió es
que ahora Java sabe, por declaración explícita, que un `Lexema` también es un
`Token`.

---

## Pregunta 2: ¿Qué porcentaje de estos lenguajes usa tipado estructural?

**Tipado estructural** = dos tipos definidos por separado (sin que uno declare
heredar o implementar al otro) son compatibles solo por tener la misma forma
(los mismos métodos/campos), sin importar dónde se declararon ni cómo se llamen.

Analizando `Go`, `OCaml`, `Rust`, `Kotlin` y `Python/Protocol`:

| Lenguaje | ¿Estructural? | Por qué |
|---|---|---|
| **Go** | Sí | Las `interface` se satisfacen implícitamente: cualquier tipo que tenga los métodos pedidos ya cumple la interfaz, sin ninguna palabra clase tipo `implements`. |
| **OCaml** | Sí (para objetos) | Los tipos de objetos (`< metodo : tipo; .. >`) son estructurales: dos clases sin relación entre sí son intercambiables si sus objetos tienen los mismos métodos. (Ojo: esto aplica a *objetos*; los `record`/`variant` normales de OCaml sí son nominales, como en Java.) |
| **Rust** | No | Los `trait` se implementan con `impl Trait for Tipo` de forma explícita, igual que las interfaces de Java. Sin ese `impl`, dos tipos con los mismos métodos siguen sin ser intercambiables. |
| **Kotlin** | No | Igual que Java: una clase debe declarar `class X : Interfaz` para contar como esa interfaz, sin importar si ya tiene los métodos. |
| **Python (`typing.Protocol`)** | Sí | Es justamente para lo que se creó `Protocol` (PEP 544): una clase satisface un `Protocol` con solo tener los métodos pedidos, sin heredar de él. Se lo suele llamar "duck typing estático". |

**Resultado: 3 de 5 (60%)** usan tipado estructural (`Go`, `OCaml` en sus objetos,
`Python/Protocol`); los otros 2 (`Rust`, `Kotlin`) son nominales, igual que Java.

*(Este 60% es un conteo propio sobre estos 5 lenguajes puntuales, no una cifra
oficial ni una medición sobre el ecosistema completo de lenguajes.)*

### Ejemplos de código

**Go — estructural:**

```go
type Speaker interface {
    Speak() string
}

type Dog struct{}
func (d Dog) Speak() string { return "Woof" }

func Announce(s Speaker) string { return s.Speak() }

func main() {
    Announce(Dog{}) // Dog nunca declaró "implements Speaker", igual funciona
}
```

**OCaml — estructural (objetos):**

```ocaml
class dog = object
  method speak = "Woof"
end

class robot = object
  method speak = "Beep"
end

(* dog y robot no comparten ninguna clase padre ni interfaz *)
let announce (s : < speak : string; .. >) = s#speak

let () =
  print_endline (announce (new dog));
  print_endline (announce (new robot))
```

**Python `Protocol` — estructural:**

```python
from typing import Protocol

class Speaker(Protocol):
    def speak(self) -> str: ...

class Dog:
    def speak(self) -> str:
        return "Woof"

def announce(s: Speaker) -> str:
    return s.speak()

announce(Dog())  # Dog nunca hereda de Speaker, y aun asi el checker lo acepta
```

**Rust — nominal (para comparar):**

```rust
trait Speaker {
    fn speak(&self) -> String;
}

struct Dog;

impl Speaker for Dog {   // sin este impl explicito, Dog NO es un Speaker
    fn speak(&self) -> String { "Woof".to_string() }
}
```

**Kotlin — nominal (para comparar):**

```kotlin
interface Speaker {
    fun speak(): String
}

class Dog : Speaker {   // sin ": Speaker" no compila, aunque tenga el mismo metodo
    override fun speak() = "Woof"
}
```
