from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

UserModel = get_user_model()


def custom_validation(data):
    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()
    ##
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('choose another email')
    ##
    if not password or len(password) < 8:
        raise ValidationError('choose another password, min 8 characters')
    ##
    if not username:
        raise ValidationError('choose another username')
    return data


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('an email is needed')
    return True


def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError('choose another username')
    return True


def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('a password is needed')
    return True


def contact_validation(data):
    print(data)
    first_name = data['firstName'].strip()
    last_name = data['lastName'].strip()
    email = data['email'].strip()
    gender = data['gender'].strip()
    birthday = data['birthdate'].strip()
    function = data['function'].strip()
    subject = data['subject'].strip()
    content = data['content'].strip()

    if gender != "male" and gender != "female":
        return False
    if not first_name or not last_name or not birthday or not function or not subject or not content or not email:
        return False
    if function != "teacher" and function != "student" and function != "other":
        print(function)
        return False
    return True
