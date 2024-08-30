
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    second_name = models.CharField(max_length=100)
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['username']

    def __str__(self):
        return f"CustomUser({self.pk} {self.email})"


class Room(models.Model):
    current_users = models.ManyToManyField(CustomUser, related_name="current_rooms", blank=True)
    def __str__(self):
        return f"Room({self.pk} {self.current_users})"


class Message(models.Model):
    room = models.ForeignKey("Room", on_delete=models.CASCADE, related_name="messages",default=1)
    text = models.TextField(max_length=500,default="")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="messages",default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message({self.user} {self.room})"