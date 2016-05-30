from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^tweet/(?P<pk>[0-9]+)/$', views.tweet_detail, name='tweet_detail'),
    url(r'^(?P<username>\w+)$', views.user_page, name='user_page'),
    url(r'^tweet_list/$', views.tweet_list, name='tweet_list'),
    url(r'^(?P<username>\w+)/new/tweet/$', views.tweet_new, name='tweet_new'),
    url(r'^$', views.user_tweet, name='user_tweet'),
    url(r'^update/profile/$', views.edit_profile, name='edit_profile'),
    url(r'^test/profile/$', views.test_page, name='test_page'),
]
