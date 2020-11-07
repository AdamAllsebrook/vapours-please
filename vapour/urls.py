from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('debug/', views.debug, name='debug'),
    path('create_account/', views.create_accounts, name='create_accounts'),
    path('get_accounts/', views.get_all_accounts, name='get_all_accounts'),
    path('get_account_by_id/', views.get_account_by_id, name='get_account_by_id')
]
