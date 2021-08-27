from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, IntegerField, TextField, FileField
from wtforms.validators import InputRequired ,DataRequired, Email, ValidationError, Length, NumberRange
from app.models import Image

# use field to grab the data associated to this field, and form to grab other data
def is_not_undefined(form,field):
    image = field.data
    if image == 'undefined':
        raise ValidationError('Enter an Image')



class ImageCreateForm(FlaskForm):
    user_id = IntegerField()
    caption = StringField('caption')
    image = FileField('image', validators=[is_not_undefined])
