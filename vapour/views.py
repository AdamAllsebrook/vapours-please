from django.http import Http404, JsonResponse
from django.shortcuts import render
import requests
import os
import json
from . import constants


# Index page
def index(request):
    context = {}
    return render(request, 'vapour/index.html', context)


# Page for debugging AJAX calls
def debug(request):
    context = {}
    return render(request, 'vapour/debug.html', context)


# Creates a given number of accounts, based on the quantity given in the POST params
def create_accounts(request):
    if not (request.is_ajax() and request.method == "POST"):
        raise Http404
    try:
        quantity = int(request.POST['quantity'][0])
    except ValueError:
        # Return bad request if the quantity is not an integer
        return JsonResponse({"Error": "Quantity must be an integer"}, status=400)

    if quantity in range(1, 26):
        headers = {'Authorization': 'Bearer ' + os.environ['CAP_ONE_KEY'], "Content-Type": "application/json",
                   "version": "1.0"}
        payload = {"quantity": quantity}
        r = requests.post(constants.CREATE_ACCOUNTS_URL, headers=headers, data=json.dumps(payload))
    else:
        # If outside of bounds, return a Bad Request error
        return JsonResponse({"Error": "Quantity must be between 1 and 25"}, status=400)
    return JsonResponse({'data': r.text}, status=200)
