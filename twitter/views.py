from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.template import RequestContext
from django.shortcuts import render_to_response, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.core.context_processors import csrf
from django.core.mail import send_mail
import hashlib, datetime, random
from django.utils import timezone
from . models import Tweet, Photo
from .forms import TweetForm, PhotoForm
from django.template import RequestContext, loader
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import login
# Create your views here.




def user_page(request, username):
	try:
		user = User.objects.get(username=username)
	except:
		raise Http404('Requested user not found ')
	tweets = user.tweet_set.all()
	return render(request, 'user_tweet_page.html', {'username':username, 'tweets':tweets})


def index(request):
	if request.user.is_authenticated():
		tweet = Tweet.objects.filter(user=request.user)
		profile = Photo.objects.filter(user=request.user)
		user_pic = Photo.objects.all()
		twitter_user = User.objects.all()
		return render(request, 'user_page.html', {'tweet':tweet, 'user_pic':user_pic, 'user':request.user, 'twitter_user':twitter_user, 'profile':profile})
	else:
		tweet = Tweet.objects.all()
		return render_to_response('main_page.html', {'tweet':tweet})


def logout_page(request):
	logout(request)
	return HttpResponseRedirect('/')

def user_tweet(request):
	tweet = Tweet.objects.all()
	return render(request, 'user_tweets.html', {'tweet':tweet})


def test_page(request):
	if request.user.is_authenticated():
		profile = Photo.objects.filter(user=request.user)
		return render(request, 'test_page.html', {'profile':profile, 'user':request.user,})
	else:
		return render_to_response('edit_profile.html')

def edit_profile(request):
	form = PhotoForm()
	if request.method == 'POST':
		form = PhotoForm(request.POST, request.FILES)
		if form.is_valid():
			post = form.save(commit=False)
			post.user = request.user
			post.save()
			return HttpResponse('Thank You for updating profile!!')
		else:
			form = PhotoForm()
	return render(request, 'edit_profile.html', {'form':form})

def tweet_new(request, username):
	form = TweetForm()
	if request.method == 'POST':
		form = TweetForm(request.POST)
		if form.is_valid():
			post = form.save(commit=False)
			post.user = request.user
			post.published_date = timezone.now()
			post.save()
			return HttpResponseRedirect('/')
		else:
			form = TweetForm()
	return render(request, 'post_tweet.html', {'form':form})


def tweet_detail(request, pk):
	tweets = Tweet.objects.get(pk=pk)
	return render(request, 'tweet_detail.html', {'tweets':tweets})


def tweet_list(request):
	if user.is_authenticated():
		tweet = Tweet.objects.filter(user=request.user)
		return render(request, 'tweet_list.html', {'tweet':tweet, 'user':request.user, })
	else:
		tweet = Tweet.objects.all()
		return render_to_response('main_page.html', {'tweet':tweet})