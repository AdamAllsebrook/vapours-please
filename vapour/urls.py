from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('debug/', views.debug, name='debug'),
    path('create_account/', views.create_accounts, name='create_accounts'),
    path('get_accounts/', views.get_all_accounts, name='get_all_accounts'),
    path('get_account_by_id/', views.get_account_by_id, name='get_account_by_id'),
    path('create_transactions/', views.create_transactions, name='create_transactions'),
    path('get_transactions/', views.get_all_transactions, name='get_all_transactions'),
    path('get_transaction_by_id/', views.get_transaction_by_id, name='get_transactions_by_id')
]
