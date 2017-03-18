from django.shortcuts import render, get_object_or_404, redirect
from django.views import generic
from .models import Account, Transaction
from django.http import HttpResponse
from datetime import datetime
from decimal import Decimal
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required

class AccountIndexView(generic.ListView):
    template_name = 'index.html'
    context_object_name = 'accounts'
    
    def get_queryset(self):
        return Account.objects.all()

@login_required
def details(request, account_id):
    account = get_object_or_404(Account, pk=account_id)
    transaction_list = Transaction.objects.filter(account=account).order_by("-transactionDate")
    paginator = Paginator(transaction_list, 25)
    
    page = request.GET.get("page")
    try:
        transactions = paginator.page(page)
    except PageNotAnInteger:
        transactions = paginator.page(1)
    except EmptyPage:
        transactions = paginator.page(paginator.num_pages)
    
    return render(request, 'transactions.html', { "account": account, "transactions": transactions })

@login_required
def debit(request, account_id):
    account = get_object_or_404(Account, pk=account_id)
    if request.method == 'POST':
        saveTransaction(account, request, "debit")
        return redirect('detail', account_id=account_id);
    today = datetime.now()
    return render(request, 'operation.html', { "operation": "debit", "account": account, "today": today })

@login_required
def credit(request, account_id):
    account = Account.objects.get(pk=account_id)
    if request.method == 'POST':
        saveTransaction(account, request, "credit")
        return redirect('detail', account_id=account_id);
    today = datetime.now()
    return render(request, 'operation.html', { "operation": "credit", "account": account, "today": today })

def saveTransaction(account, request, type):
    if(type == "debit"):
        amount = -round(Decimal(request.POST['amount']), 2)
    else:
        amount = round(Decimal(request.POST['amount']), 2)
    transaction = Transaction(
                              description=request.POST['description'],
                              amount=amount,
                              account=account)
    transaction.transactionDate = request.POST['date'];
    transaction.save();
        
    account.balance += amount;
    account.save();