from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, IntegerField, TextField, FileField
from wtforms.validators import InputRequired ,DataRequired, Email, ValidationError, Length, NumberRange
from app.models import Image


# use field to grab the data associated to this field, and form to grab other data
def is_not_undefined(form,field):
    image = field.data
    if image == 'undefined':
        raise ValidationError('Please refresh the page')

class EditProfileForm(FlaskForm):
    # id = IntegerField('id')
    # avatar = FileField('avatar', validators=[is_not_undefined])
    avatar = FileField('avatar')
    username = StringField('username', validators=[Length(min=4, max=50, message="Username must be less than %(max)d characters")])
    email = StringField('email', validators=[Email(message='invalid email')])
    bio = StringField('bio', validators=[Length(min=0, max=250, message="Bio must be less than %(max)d characters")])
