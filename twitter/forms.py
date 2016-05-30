
from django import forms
from . models import Tweet, Photo

class TweetForm(forms.ModelForm):
	class Meta:
		model = Tweet
		fields = ('tweet',)

class PhotoForm(forms.ModelForm):
	class Meta:
		model = Photo
		fields = ('image','name', 'age', 'dob', 'school_college')
