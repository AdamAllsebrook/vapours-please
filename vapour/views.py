from django.shortcuts import render


# Index page
def index(request):
    context = {}
    return render(request, 'vapour/index.html', context)
