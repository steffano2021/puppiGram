from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, IntegerField, TextField, FileField
from wtforms.validators import InputRequired ,DataRequired, Email, ValidationError, Length, NumberRange
from app.models import Image

# this form only has caption because I'm using image_create_form for
# submitting the patch request for images

class ImageEditForm(FlaskForm):
    user_id = IntegerField()
    caption = TextAreaField('caption', validators=[Length(min=0, max=50, message="Caption must be less than %(max)d characters")])
