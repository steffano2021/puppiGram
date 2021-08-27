from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, IntegerField, TextField, FileField
from wtforms.validators import InputRequired ,DataRequired, Email, ValidationError, Length, NumberRange
# from flask_wtf.file import FileField
from app.models import Image





class ImageCreateForm(FlaskForm):
    user_id = IntegerField()
    caption = StringField('caption')
    image = FileField('image')
    # image = FileField('image', validators=[DataRequired(message='please enter a image link')])
