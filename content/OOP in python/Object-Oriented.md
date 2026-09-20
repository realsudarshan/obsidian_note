	Attributes->data
	Methods->function

Class and objects:
```python
class Dog:
	def __init__(self,name,breed):
		self.name = name
		self.breed=breed
	def bark(self):
		print(f"{self.name} says Woof!")
dog1=Dog("Buddy","Golden Retriever")
dog1.bark()
```

__init__ acts like constructor
self is like "this" which indicated the currently instance of class.

It support [[Encapsulation]] which is hiding the internal state of an object and only exposes what necessary
It also support [[Abstraction]] which means hiding complex logic and show only important features
It also support [[Polymorphism]] which means `same interface,different behaviour` .Achieved via method overriding or [[duck typing]]
## Some extra concepts
super() keyword:
Used to call the parent class constructor or methods.

```python
class Parent:
    def __init__(self):
        print("Parent initialized")

class Child(Parent):
    def __init__(self):
        super().__init__()  # call parent constructor
        print("Child initialized")

child = Child()
```

> [!TIP] 😂
> Afno papa lai bolaunxa
### Class Methods and Static Methods:
Class method:
- Takes `cls` as the **first argument**
- Works with the **class itself**, not the object
- Can be used to create **alternative constructors**
-Static method:- No `self` or `cls` required
- Behaves like a regular function **inside a class**
- Used when the method does **not need access to class or instance data**

python

Copy code
```python
class Math:
    @staticmethod
    def add(x, y):
        return x + y

    @classmethod
    def info(cls):
        return "This is a Math class"

print(Math.add(5, 3))
print(Math.info())

```
## `__str__` and `__repr__`
__str__:User friendly display
Called by print(obj) or str(obj)
__repr__:Developer/debug-friendly display

```python
class Book:
    def __init__(self, title, price):
        self.title = title
        self.price = price

    def __str__(self):
        return f"'{self.title}' costs Rs. {self.price}"

    def __repr__(self):
        return f"Book(title='{self.title}', price={self.price})"
book = Book("Python 101", 500)

print(book)         # 👉 calls __str__
print(str(book))    # 👉 also calls __str__

print(repr(book))   # 👉 calls __repr__
book                # 👉 REPL (console) uses __repr__
```

