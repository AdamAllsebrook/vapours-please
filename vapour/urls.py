from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('debug/', views.debug, name='debug'),
    path('create_account/', views.create_accounts, name='create_accounts')
]
