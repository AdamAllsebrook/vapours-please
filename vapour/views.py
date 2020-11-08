from django.http import Http404, JsonResponse
from django.shortcuts import render
import requests
import os
import json

from django.views.decorators.csrf import csrf_exempt

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
@csrf_exempt
def create_accounts(request):
    # Check request is ajax and a post request
    if not (request.is_ajax() and request.method == "POST"):
        raise Http404
    try:
        quantity = int(request.POST['quantity'][0])
    except ValueError:
        # Return bad request if the quantity is not an integer
        return JsonResponse({"Error": "Quantity must be an integer"}, status=400)

    # Check quantity is within the range the API accepts
    if quantity in range(1, 26):
        headers = {'Authorization': 'Bearer ' + os.environ['CAP_ONE_KEY'], "Content-Type": "application/json",
                   "version": "1.0"}
        payload = {"quantity": quantity}
        r = requests.post(constants.CREATE_ACCOUNTS_URL, headers=headers, data=json.dumps(payload))
    else:
        # If outside of bounds, return a Bad Request error
        return JsonResponse({"Error": "Quantity must be between 1 and 25"}, status=400)
    return JsonResponse({'data': r.text}, status=200)


# Gets all accounts associated with our API key
@csrf_exempt
def get_all_accounts(request):
    # Check request is ajax and a post request
    if not (request.is_ajax() and request.method == "POST"):
        raise Http404
    headers = {'Authorization': 'Bearer ' + os.environ['CAP_ONE_KEY'], "version": "1.0"}
    payload = {}
    r = requests.get(constants.GET_ACCOUNTS_URL, headers=headers, data=json.dumps(payload))
    return JsonResponse({'data': r.text}, status=200)


# Gets the account with the given account id
@csrf_exempt
def get_account_by_id(request):
    # Check request is ajax and a post request
    if not (request.is_ajax() and request.method == "POST"):
        raise Http404
    try:
        # Check account id is an int
        int(request.POST['account_id'])
        # Assign the string value, as casting to int removes 0s at the front of the id, which causes 404 on lookup
        account_id = request.POST['account_id']
    except ValueError:
        return JsonResponse({"Error": "Account ID must be an integer"}, status=400)

    headers = {'Authorization': 'Bearer ' + os.environ['CAP_ONE_KEY'], "version": "1.0"}
    r = requests.get(constants.GET_ACCOUNTS_URL + "/" + str(account_id), headers=headers)
    return JsonResponse({'data': r.text}, status=200)


# Creates between 1 and 25 transactions for a given user, specified by their account id
@csrf_exempt
def create_transactions(request):
    # Check request is ajax and a post request
    if not (request.is_ajax() and request.method == "POST"):
        raise Http404
    # Check quantity and account id are both integers
    try:
        quantity = int(request.POST['quantity'])
        # Don't store the int version of account id, as int casting removes any 0s at the front, causing 404 on lookup
        int(request.POST['account_id'])
        account_id = request.POST['account_id']
    except ValueError:
        return JsonResponse({'error': "Account Id and quantity must be integers"}, status=400)

    # Check quantity is within limit allowed by API
    if quantity in range(1, 26):
        headers = {'Authorization': 'Bearer ' + os.environ['CAP_ONE_KEY'], "Content-Type": "application/json",
                   "version": "1.0"}
        payload = {"quantity": quantity}
        req_url = constants.BASE_TRANSACTIONS_URL + account_id + "/create"
        r = requests.post(req_url, headers=headers, data=json.dumps(payload))
        return JsonResponse({'data': r.text}, status=200)
    else:
        return JsonResponse({"Error": "Quantity must be within 1-25"}, status=400)


# Gets all transactions for a given account
# Creates between 1 and 25 transactions for a given user, specified by their account id
@csrf_exempt
def get_all_transactions(request):
    # Check request is ajax and a post request
    if not (request.is_ajax() and request.method == "POST"):
        raise Http404
    # Check quantity and account id are both integers
    try:
        # Don't store the int version of account id, as int casting removes any 0s at the front, causing 404 on lookup
        int(request.POST['account_id'])
        account_id = request.POST['account_id']
    except ValueError:
        return JsonResponse({'error': "Account Id must be an integer"}, status=400)
    req_url = constants.BASE_TRANSACTIONS_URL + account_id + "/transactions"
    headers = {'Authorization': 'Bearer ' + os.environ['CAP_ONE_KEY'], "version": "1.0"}
    r = requests.get(req_url, headers=headers)
    return JsonResponse({'data': r.text}, status=200)


# Gets a given transaction for a given account
# Creates between 1 and 25 transactions for a given user, specified by their account id
@csrf_exempt
def get_transaction_by_id(request):
    # Check request is ajax and a post request
    if not (request.is_ajax() and request.method == "POST"):
        raise Http404
        # Check quantity and account id are both integers
    try:
        # Don't store the int version of account id, as int casting removes any 0s at the front, causing 404 on lookup
        int(request.POST['account_id'])
        account_id = request.POST['account_id']
        transaction_id = request.POST['transaction_id']
    except ValueError:
        return JsonResponse({'error': "Account Id must be an integer"}, status=400)
    req_url = constants.BASE_TRANSACTIONS_URL + account_id + "/transactions/" + transaction_id
    headers = {'Authorization': 'Bearer ' + os.environ['CAP_ONE_KEY'], "version": "1.0"}
    r = requests.get(req_url, headers=headers)
    return JsonResponse({'data': r.text}, status=200)
