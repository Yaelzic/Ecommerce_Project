from django.http import JsonResponse


def index(r):
    return JsonResponse({'test':"test"})