from django.conf import settings
from django.conf.urls import patterns, include, url
from django.views.static import serve as django_static_serve

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Home Page
    (r'^uber/code-challenge/$', 'app.views.home_page'),
    # User Location
    (r'^uber/code-challenge/user-city/$', 'app.apis.get_user_city'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    (r'^static/(?P<path>.*)$', django_static_serve, {'document_root': settings.STATIC_ROOT})
)
