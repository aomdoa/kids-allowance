from django.conf.urls import url
from django.contrib.auth import views as auth_views
from . import views
from .views import AccountIndexView
from django.contrib.auth.decorators import login_required

urlpatterns = [
    url('^accounts/login/', auth_views.login, {'template_name': 'login.html'}),
    url('^login/', auth_views.login, {'template_name': 'login.html'}),
    url(r'^$', login_required(AccountIndexView.as_view()), name='index'),
    url(r'^(?P<account_id>[0-9]+)$', views.details, name='detail'),
    url(r'^(?P<account_id>[0-9]+)/debit/$', views.debit, name='debit'),
    url(r'^(?P<account_id>[0-9]+)/credit/$', views.credit, name='credit')
]
