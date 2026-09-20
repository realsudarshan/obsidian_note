```python
from abc import ABC, abstractmethod
class Bank(ABC):
	 @abstractmethod
	 def get_balance(self):
		 pass
class BankAccount(Bank):
	def __init__(self,balance):
		self.__balance=balance
	def deposit(self,amount):
		self.__balance+=amount
	def get_balance(self):
		return self.__balance
account=BankAccount(1000)
account.deposit(500)
print(account.get_balance())
```

Bank class is just a **template** saying "All Bank services(like Bankaccount) must implement an `get_balance` method
It will be overridden by its child(Abstract class)