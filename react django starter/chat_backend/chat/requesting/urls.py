from django.urls import path

from . import views

urlpatterns = [
    path("get_user/", views.check_auth, name="index"),
    path("auth/", views.authentification, name="requesting"),
]