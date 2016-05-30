from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.

class Tweet(models.Model):
	tweet = models.CharField(max_length=200)
	user = models.ForeignKey(User)
	published_date = models.DateTimeField(default=timezone.now)

	class Meta:
		ordering = ('-published_date',)


class Photo(models.Model):
	image = models.ImageField(upload_to='profile_pic')
	name = models.TextField(max_length=120)
	age = models.IntegerField()
	dob = models.DateField()
	school_college = models.TextField(max_length=150)
	user = models.ForeignKey(User)
	
