from django.db import models
from django.utils import timezone
import textwrap

# Create your models here.
class Child(models.Model):
    name = models.CharField(max_length=200)
    birthday = models.DateField(verbose_name="Birthday", name="birthday", default=timezone.now)
    
    def __str__(self):
        return self.name

class Account(models.Model):
    name = models.CharField(max_length=200)
    owner = models.ForeignKey(Child)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return "{0} {1}".format(self.owner.name, self.name)
        
class Transaction(models.Model):
    description = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    account = models.ForeignKey(Account)
    date = models.DateField(verbose_name="Transaction Date", name="transactionDate", default=timezone.now)
    
    def __str__(self):
        return textwrap.shorten(self.description, width=10, placeholder="...")
    
class Recurance(models.Model):
    FREQUENCIES = (
        ('Y', 'Yearly'),
        ('M', 'Monthly'),
        ('B', 'Bi-Weekly'),
        ('W', 'Weekly'),
        ('D', 'Daily')
    )
    
    APPLIES = (
        ('MO', 'Monday'),
        ('TU', 'Tuesday'),
        ('WE', 'Wednesday'),
        ('TH', 'Thursday'),
        ('FR', 'Friday'),
        ('SA', 'Saturday'),
        ('SU', 'Sunday'),
        ('FD', 'First Day'),
        ('LD', 'Last Day'),
        ('MD', 'Mid Month')
    )

    TYPES = (
        ('I', 'Interest'),
        ('A', 'Allowance')
    )
    
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=1, choices=TYPES)
    frequency = models.CharField(max_length=1, choices=FREQUENCIES)
    applies = models.CharField(max_length=2, choices=APPLIES)
    value = models.DecimalField(max_digits=6, decimal_places=2)
            
    def __str__(self):
        return self.name
    
class AccountOperation(models.Model):
    account = models.ForeignKey(Account)
    recurance = models.ForeignKey(Recurance)
    last_applied = models.DateField(verbose_name="Last Applied", name="last_applied", default=timezone.now)
    
    def __str__(self):
        return "{} {}".format(self.account, self.recurance)
