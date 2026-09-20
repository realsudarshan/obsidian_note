Here, the type or class of an object is **determined by its behavior (methods and properties)**, **not by its actual class**
```python
class Duck:
    def quack(self):
        print("Quack!")

class Person:
    def quack(self):
        print("I'm pretending to be a duck!")

def make_it_quack(thing):
    thing.quack()

duck = Duck()
person = Person()

make_it_quack(duck)    # Output: Quack!
make_it_quack(person)  # Output: I'm pretending to be a duck!

```
Little difference from Abstraction:
[[Abstraction]]:
```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        print("Bark!")

# You *must* implement speak() or Python will raise an error

```
“I don’t care _how_ it speaks, but every `Animal` must be able to `speak()`
[[duck typing]]:“I don’t even care what the object is. If it walks like a duck and quacks like a duck, just let it go!”
