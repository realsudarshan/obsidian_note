```python
class Bird:
	def make_sound(self):
		print("Chirp")
class Duck(Bird):
	def make_Sound(self):
		print("Quack")
def animal_sound(animal):
	animal.make_sound()
duck=Duck()
bird=Bird()
animal_sound(duck)
animal_sound(bird)
```
