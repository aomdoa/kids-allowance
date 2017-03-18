from django.core.management.base import BaseCommand, CommandError
from accounts.models import *
from datetime import date
import calendar
import math

class Command(BaseCommand):
    help = 'Runs recurance transactions for the day'
    
    def isLastDayOfMonth(self, date):
        range = calendar.monthrange(date.year, date.month)
        return range[1] == date.day
    
    def isFirstDayOfMonth(self, date):
        return date.day == 1
    
    def matchesDay(self, day, date):
        dayOfWeek = calendar.weekday(date.year, date.month, date.day)
        if day == 'MO' and dayOfWeek == 0:
            return True
        elif day == 'TU' and dayOfWeek == 1:
            return True
        elif day == 'WE' and dayOfWeek == 2:
            return True
        elif day == 'TH' and dayOfWeek == 3:
            return True
        elif day == 'FR' and dayOfWeek == 4:
            return True
        elif day == 'SA' and dayOfWeek == 5:
            return True
        elif day == 'SU' and dayOfWeek == 6:
            return True
        return False
    
    def apply(self, operation, today):
        if operation.recurance.type == 'I':
            if(operation.account.balance < 0):
                return
            description = "Interest Payment"
            amount = round(operation.account.balance * (operation.recurance.value / 100), 2)
        else:
            age = math.floor((date.today() - operation.account.owner.birthday).days / 365.25)
            description = "Allowance Payment"
            amount = age * operation.recurance.value
        
        transaction = Transaction(
                              description=description,
                              amount=amount,
                              account=operation.account,
                              transactionDate=today)
        transaction.save()
        
        operation.account.balance += amount;
        operation.account.save();
        
        operation.last_applied = today
        operation.save()
        
    def handle(self, *args, **options):
        operations = AccountOperation.objects.all()
        today = date.today()
        for operation in operations:
            if operation.last_applied == today:
                continue
                        
            recurance = operation.recurance
            if recurance.frequency == 'Y':
                if recurance.applies == 'FD' and today.month == 1 and self.isFirstDayOfMonth(today):
                    self.apply(operation, today)
                elif recurance.applies == 'LD' and today.month == 12 and self.isLastDayOfMonth(today):
                    self.apply(operation, today)
            elif recurance.frequency == 'M':
                if recurance.applies == 'FD' and self.isFirstDayOfMonth(today):
                    self.apply(operation, today)
                elif recurance.applies == 'LD' and self.isLastDayOfMonth(today):
                    self.apply(operation, today)
            elif recurance.applies == 'B':
                difference = today - operation.last_applied
                if difference.days >= 14 and self.matchesDay(recurance.applies, today):
                    self.apply(operation, today)
            elif recurance.frequency == 'W' and self.matchesDay(recurance.applies, today):
                self.apply(operation, today)
            elif recurance.frequency == 'D':
                self.apply(operation, today)
