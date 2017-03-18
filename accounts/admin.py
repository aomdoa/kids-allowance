from django.contrib import admin

# Register your models here.
from .models import Child, Account, Transaction, Recurance, AccountOperation

admin.site.register(Child)
admin.site.register(Account)
admin.site.register(Transaction)
admin.site.register(Recurance)
admin.site.register(AccountOperation)