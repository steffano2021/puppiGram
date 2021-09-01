from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Please enter a username'), Length(min=10, max=50, message="username must be 10 chars, max %(max)d"), username_exists])
    email = StringField('email', validators=[DataRequired(message='Please enter an email'), Email(message='invalid email'), user_exists])
    password = StringField('password', validators=[DataRequired(message='Please enter a password'), Length(min=12, max=255, message="password must be minimum 12 chars")])
