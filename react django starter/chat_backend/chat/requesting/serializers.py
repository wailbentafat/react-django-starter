
from .models import CustomUser, Room, Message
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ["password"]


class MessageSerializer(serializers.ModelSerializer):
    created_at_formatted = serializers.SerializerMethodField()
    user = UserSerializer()

    class Meta:
        model = Message
        exclude = []
        depth = 1

    def get_created_at_formatted(self, obj:Message):
        return obj.created_at.strftime("%d-%m-%Y %H:%M:%S")

class RoomSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = ["pk", "messages", "current_users", "last_message"]
        depth = 1
        read_only_fields = ["messages", "last_message"]

    def get_last_message(self, obj:Room):
        return MessageSerializer(obj.messages.order_by('created_at').last()).data
    
    
class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["pk", "email"]

class UsercreateSerializer(serializers.ModelSerializer):##retrieve
    class Meta:
        model = CustomUser
        fields=["email","first_name","second_name","password"]
class addmessageserializers(serializers.ModelSerializer):
    class Meta:
        model=Message
        fields=["text","room","user"]
       
class addroom(serializers.ModelSerializer):##rooom serializer
    class Meta:
        model=Room
        fields=['id',"current_users"]       
                   