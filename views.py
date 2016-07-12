from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse

# Create your views here.
def index(request):
	return render(request, 'TeraDictV3/index.html')
